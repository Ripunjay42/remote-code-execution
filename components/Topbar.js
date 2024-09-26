'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, List, PlayCircle, Menu, X } from 'lucide-react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [showSignOut, setShowSignOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between sm:px-6 px-2 md:px-24 h-16">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center text-violet-300 text-lg font-bold">
          <img src="/logo.png" alt="Roj Code Logo" className="h-8 w-8 mr-2 pointer-events-none" />
          DailyCode
        </Link>

        {/* Centered Menu for Desktop */}


        <div className="hidden md:flex justify-center flex-grow space-x-8">

        <Link 
            href="/" 
            className="flex items-center text-violet-300 text-lg font-bold border-b-2 border-transparent transition duration-300"
          >
            <List className="mr-1 h-5 w-5 text-violet-300" />
            Problems
          </Link>
          <Link 
            href="/practice" 
            className="flex items-center text-violet-300 text-lg font-bold border-b-2 border-transparent transition duration-300"
          >
            <PlayCircle className="mr-1 h-5 w-5 text-violet-300" />
            Practice
          </Link>
        
        </div>

        {/* User Profile/Sign In on the right */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowSignOut(!showSignOut)}
                className="flex items-center space-x-2 text-white"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full border-2 border-violet-300">
                  <User className="h-5 w-5 text-violet-300" />
                </div>
                <span className="text-sm">{user.name}</span>
              </button>
              {showSignOut && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-20 bg-violet-800 rounded-md shadow-lg py-1">
                  <button
                    onClick={handleSignOut}
                    className="block p-0 text-sm text-white w-full text-center"
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

        {/* Mobile menu button and Sign In */}
        <div className="flex items-center space-x-2 md:hidden">
          <button onClick={toggleMenu} className="text-violet-300">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Mobile Sign In/Out */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowSignOut(!showSignOut)}
                className="flex items-center space-x-2 text-white"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full border-2 border-violet-300
                  
                  ">
                  <User className="h-5 w-5 text-violet-400" />
                </div>
              </button>
              {showSignOut && (
                <div className="absolute right-0 mt-2 w-20 bg-violet-800 rounded-md shadow-lg py-1">
                  <button
                    onClick={handleSignOut}
                    className="block p-0 text-sm text-white w-full text-center"
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

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black shadow-lg py-2 z-10">
          <Link 
            href="/" 
            className="block px-4 py-2 text-violet-300 text-lg font-bold"
            onClick={toggleMenu}
          >
            <List className="inline-block mr-2 h-5 w-5 text-violet-300" />
            Problems
          </Link>

          <Link 
            href="/practice" 
            className="block px-4 py-2 text-violet-300 text-lg font-bold"
            onClick={toggleMenu}
          >
            <PlayCircle className="inline-block mr-2 h-5 w-5 text-violet-300" />
            Practice
          </Link>
        </div>
      )}
    </div>
  );
};

export default Topbar;
