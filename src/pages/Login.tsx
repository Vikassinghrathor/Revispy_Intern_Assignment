import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check if user exists and credentials match
    const user = registeredUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      // Store user info in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        name: user.name,
        email: user.email
      }));

      onLoginSuccess();
      navigate('/category');
    } else {
      setError('Invalid email or password');
    }
  };
  
  return (
    <>
      <div className="flex overflow-hidden flex-col bg-white rounded">
        <div className="flex flex-col self-center px-16 pt-10 pb-32 mt-10 mb-10 ml-12 max-w-full text-base bg-white rounded-3xl border border-solid border-stone-300 w-[576px] max-md:px-5 max-md:pb-24">
          <div className="self-center text-3xl font-semibold text-black">
            Login
          </div>
          <div className="self-center mt-4 text-base font-medium text-black">
            Welcome back to ECOMMERCE
          </div>
          <div className="self-center mt-2 text-base text-black">
            The next gen business marketplace
          </div>

          <form onSubmit={handleSubmit}>
            <div className="self-start mt-8 text-black">Email</div>
            <div className="flex flex-col mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:max-w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter"
                className="px-4 py-4 bg-white rounded-md border border-solid border-stone-300 max-md:pr-5 max-md:max-w-full"
                required
              />
            </div>

            <div className="self-start mt-8 text-black">Password</div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter"
                className="w-full px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:pr-5 max-md:max-w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="overflow-hidden gap-2.5 self-stretch w-full px-36 py-5 mt-10 font-medium tracking-wider text-center text-white uppercase bg-black rounded-md border border-black border-solid min-h-[56px] max-md:px-5"
            >
              Login
            </button>
          </form>

          <div className="flex gap-3 self-center mt-12 mb-0 max-w-full w-[202px] max-md:mt-10 max-md:mb-2.5">
            <div className="grow text-zinc-800">Don't have an Account? </div>
            <Link
              to="/signup"
              className="self-start font-medium tracking-wider text-black uppercase whitespace-nowrap hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;