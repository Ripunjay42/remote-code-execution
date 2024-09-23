import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'next/navigation'; 

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const cleanFirebaseError = (message) => {
    // Remove the Firebase part of the message
    return message.replace("Firebase: ", "").replace(/\(.*\)/, "").trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Set loading to true
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose(); // Close the modal if sign-up is successful
      router.push('/'); // Redirect to home page
    } catch (error) {
      // Check for specific Firebase error codes and handle them
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError(cleanFirebaseError(error.message));
      }
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="bg-transparent flex justify-center items-center">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-lg max-w-xs sm:max-w-md w-96">
        <h2 className="text-2xl text-violet-300 font-bold mb-4">Sign Up</h2>
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
          <button type="submit" className="w-full bg-green-800 text-white text-sm font-bold p-1 rounded hover:bg-green-700" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 text-sm">
          <p className='text-violet-400'>Already have an account?{' '}
            <button onClick={onLoginClick} className="text-cyan-300 hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
