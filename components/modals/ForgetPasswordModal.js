// components/ForgotPasswordModal.js
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const cleanFirebaseError = (message) => {
    // Remove the Firebase part of the message
    return message.replace("Firebase: ", "").replace(/\(.*\)/, "").trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
        setError(cleanFirebaseError(error.message));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-transparent flex justify-center items-center">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-lg max-w-xs sm:max-w-md w-96">
        <h2 className="text-2xl text-violet-300 font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1 border rounded text-md"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold p-1 rounded">
            Send Reset Link
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
        <button onClick={onClose} className="mt-4 text-sm text-cyan-300">
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;