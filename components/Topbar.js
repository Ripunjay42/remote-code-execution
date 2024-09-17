'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24 h-16">
      {/* Add the logo image before the Roj Code text */}
      <Link href="/" className="flex items-center text-violet-300 text-lg font-bold">
        <img src="/logo.png" alt="Roj Code Logo" className="h-8 w-8 mr-2 pointer-events-none" /> {/* Adjust the path and size */}
        Daily Code
      </Link>
      <div>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowSignOut(!showSignOut)}
              className="flex items-center space-x-2 text-white"
            >
              {/* Add a circular background to the User icon */}
              <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                <User className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-sm">{user.name}</span>
            </button>
            {showSignOut && (
              <div className="absolute right-0 mt-2 w-20 bg-violet-800 rounded-md shadow-lg py-1">
                <button
                  onClick={handleSignOut}
                  className="block px-2 py-1 text-sm text-white w-full text-center"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth">
            <button className="bg-violet-600 hover:bg-violet-900 text-white text-sm font-bold py-1 px-3 rounded">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
