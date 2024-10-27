import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('registrationEmail');
    if (!storedEmail) {
      navigate('/register');
    } else {
      // Mask email for display
      const [username, domain] = storedEmail.split('@');
      const maskedUsername = username.slice(0, 3) + '***';
      setEmail(`${maskedUsername}@${domain}`);
    }
  }, [navigate]);

  const handleInput = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value.slice(0, 1);
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!verificationCode[index] && index > 0) {
        const newCode = [...verificationCode];
        newCode[index - 1] = '';
        setVerificationCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
    // Handle left arrow
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle right arrow
    else if (e.key === 'ArrowRight' && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    const newCode = [...verificationCode];
    pastedData.split('').forEach((char, index) => {
      if (index < 8) newCode[index] = char;
    });
    setVerificationCode(newCode);

    // Focus last filled input or first empty input
    const focusIndex = Math.min(pastedData.length, 7);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode.some(digit => !digit)) {
      setError('Please enter all digits');
      return;
    }

    setLoading(true);
    try {
      const code = verificationCode.join('');
      // Replace this with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful verification
      console.log('Verification code submitted:', code);

      // Clear verification data
      sessionStorage.removeItem('verificationCode');
      sessionStorage.removeItem('registrationEmail');

      // Navigate to success page or dashboard
      navigate('/login');
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex overflow-hidden flex-col bg-white rounded">
        <div className="flex flex-col self-center px-16 py-12 mt-10 max-w-full bg-white rounded-3xl border border-solid border-stone-300 w-[576px] max-md:px-5">
          <div className="self-center text-3xl font-semibold text-black">
            Verify your email
          </div>
          <div className="self-center mt-8 text-base text-center text-black">
            Enter the 8 digit code you have received on <br />
            <span className="font-medium">{email}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="self-start mt-12 text-base text-black max-md:mt-10 max-md:ml-0.5">
              Code
            </div>
            <div className="flex gap-3 mt-2 max-md:mr-0.5">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={digit}
                  onChange={(e) => handleInput(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="flex shrink-0 bg-white rounded-md border border-solid border-stone-300 h-[47px] w-[47px] text-center text-lg font-medium focus:border-black focus:outline-none"
                  maxLength={1}
                />
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || verificationCode.some(digit => !digit)}
              className="overflow-hidden gap-2.5 self-stretch px-36 py-5 mt-16 text-base font-medium tracking-wider text-center text-white uppercase whitespace-nowrap bg-black rounded-md border border-black border-solid min-h-[56px] max-md:px-5 max-md:mt-10 disabled:bg-gray-400 disabled:border-gray-400"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          <button
            onClick={() => {
              // Add resend verification code logic here
              setError('New verification code sent!');
            }}
            className="mt-4 text-black underline text-sm hover:text-gray-600"
          >
            Resend verification code
          </button>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;