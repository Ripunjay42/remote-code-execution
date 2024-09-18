import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // New routing from next/navigation
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const LoginModal = ({ isOpen, onClose, onCreateAccountClick, onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter from next/navigation

  // Function to display more user-friendly error messages
  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up or check the email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/invalid-email':
        return 'The email address is invalid. Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/invalid-credential':
        return 'The credentials provided are invalid. Try again.';
      default:
        return 'An error occurred while logging in. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Close the modal if login is successful
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Login error:', error); // Log the error to inspect the structure

      const errorCode = error.code ? error.code : 'default';
      setError(handleAuthError(errorCode));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-transparent flex justify-center items-center">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-lg max-w-xs sm:max-w-md w-96">
        <h2 className="text-2xl  text-violet-300 font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1 border rounded text-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1 border rounded text-md"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold p-1 rounded hover:bg-blue-700">
            Log In
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 flex justify-between text-sm">
          <button onClick={onCreateAccountClick} className="text-cyan-300 hover:underline">
            Create Account
          </button>
          <button onClick={onForgotPasswordClick} className="text-cyan-300 hover:underline">
            Forgot Password?
          </button>
        </div>
        <button onClick={onClose} className="mt-4 text-sm text-cyan-300 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
