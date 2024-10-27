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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onLoginSuccess();
      navigate('/category');
    } catch (error) {

    }
  };

  return (
    <>
      <div className="flex overflow-hidden flex-col pb-44 bg-white rounded max-md:pb-24">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col self-center px-16 py-12 mt-10 max-w-full text-base bg-white rounded-3xl border border-solid border-stone-300 w-[576px] max-md:px-5"
        >
          <div className="self-center text-3xl font-semibold text-black">
            Login
          </div>
          <div className="self-end mt-9 mr-5 text-2xl font-medium text-black max-md:mr-2.5">
            Welcome back to ECOMMERCE
          </div>
          <div className="self-center mt-3.5 text-black">
            The next gen business marketplace
          </div>
          <label className="self-start mt-8 text-black">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter"
            className="px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 text-zinc-500 max-md:pr-5 max-md:max-w-full"
            required
          />
          <label className="self-start mt-8 text-black">Password</label>
          <div className="flex gap-5 justify-between px-4 py-4 mt-2 whitespace-nowrap bg-white rounded-md border border-solid border-stone-300 max-md:max-w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter"
              className="grow text-zinc-500 bg-transparent border-none outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="overflow-hidden gap-2.5 self-stretch px-36 py-5 mt-10 font-medium tracking-wider text-center text-white uppercase whitespace-nowrap bg-black rounded-md border border-black border-solid min-h-[56px] max-md:px-5"
          >
            Login
          </button>
          <div className="flex shrink-0 mt-7 h-px bg-stone-300 max-md:max-w-full" />
          <div className="flex gap-2.5 self-center mt-8 max-w-full w-[261px]">
            <div className="grow text-zinc-800">Don't have an Account? </div>
            <Link
              to="/signup"
              className="self-start font-medium tracking-wider text-black uppercase hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;