import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    toast.success('If this email is registered, you will receive reset instructions shortly.');
    setEmail('');
  };

  return (
    <div className='w-screen min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white p-8 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-4'>Forgot Password</h2>
        <p className='text-sm text-gray-600 mb-6'>Enter your email address and we&apos;ll send you a link to reset your password.</p>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </div>
          <button
            type='submit'
            className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
          >
            Send reset link
          </button>
        </form>
        <div className='mt-6 text-center text-sm text-gray-600'>
          Remembered your password?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-500'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
