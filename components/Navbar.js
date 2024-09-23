'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from './firebase/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = ({ onLoginClick, onSignupClick, setIsLoginOpen }) => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes to detect if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      setUser(null); // Clear user state
      setIsLoginOpen(true);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex items-center justify-between sm:px-6 px-2 md:px-24 h-16">
      <Link href="/" className="flex items-center text-violet-300 text-lg font-bold">
        <img src="/logo.png" alt="Roj Code Logo" className="h-8 w-8 mr-2 pointer-events-none" /> {/* Adjust the path and size */}
        DailyCode
      </Link>
      <div className="space-x-2">
        {user ? (
          // Show "Log Out" button if the user is logged in
          <button onClick={handleLogout} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-1 px-3 rounded">
            Sign Out
          </button>
        ) : (
          // Show "Log In" and "Create Account" buttons if the user is not logged in
          <>
            <button
              onClick={onLoginClick}
              className="bg-violet-800 hover:bg-violet-900 text-white text-sm font-bold py-1 px-3 rounded"
            >
              Sign In
            </button>
            <button
              onClick={onSignupClick}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold py-1 px-3 rounded"
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
