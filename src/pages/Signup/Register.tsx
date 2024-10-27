import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegisterSuccess: () => void;
}

function Register({ onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validates form input fields
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles input change and error clearance
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Check for existing email
      if (existingUsers.some((user: { email: string }) => user.email === formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Email already registered' }));
        setLoading(false);
        return;
      }

      // Register new user
      const newUser = { ...formData };
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Store email for verification page
      sessionStorage.setItem('registrationEmail', formData.email);

      // Generate verification code
      const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString();
      sessionStorage.setItem('verificationCode', verificationCode);
      console.log('Verification code:', verificationCode);

      // Call onRegisterSuccess before navigation
      onRegisterSuccess();

      // Navigate to verification page
      navigate('/verify-email', { replace: true });
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Registration failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col bg-white rounded">
      <div className="flex flex-col self-center px-16 pt-10 pb-32 mt-10 mb-10 ml-32 max-w-full text-base bg-white rounded-3xl border border-solid border-stone-300 w-[576px] max-md:px-5 max-md:pb-24">
        <div className="self-center text-3xl font-semibold text-black">
          Create your account
        </div>
        <form onSubmit={handleSubmit}>
          <div className="self-start mt-8 text-black">Name</div>
          <div className="flex flex-col mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:max-w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter"
              className="px-4 py-4 bg-white rounded-md border border-solid border-stone-300 max-md:pr-5 max-md:max-w-full"
              required
            />
            {errors.name && <span className="text-red-500 text-xs px-4 py-1">{errors.name}</span>}
          </div>

          <div className="self-start mt-8 text-black">Email</div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter"
              className="w-full px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:pr-5 max-md:max-w-full"
              required
            />
            {errors.email && <span className="text-red-500 text-xs px-4 py-1">{errors.email}</span>}
          </div>

          <div className="self-start mt-8 text-black">Password</div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter"
              className="w-full px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:pr-5 max-md:max-w-full"
              required
            />
            {errors.password && <span className="text-red-500 text-xs px-4 py-1">{errors.password}</span>}
          </div>

          {errors.submit && (
            <div className="mt-4 text-red-500 text-center text-sm">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center whitespace-nowrap px-8 py-4 mt-10 font-medium tracking-wider text-white uppercase bg-black rounded-md border border-black border-solid h-14 hover:bg-gray-900 transition-colors duration-200 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Creating account
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="flex gap-3 self-center mt-12 mb-0 max-w-full w-[202px] max-md:mt-10 max-md:mb-2.5">
          <div className="grow text-zinc-800">Have an Account? </div>
          <Link
            to="/login"
            className="self-start font-medium tracking-wider text-black uppercase whitespace-nowrap hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
