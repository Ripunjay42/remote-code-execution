'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, List, PlayCircle, Menu, X} from 'lucide-react';
import { auth } from './firebase/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Navbar = ({ onLoginClick, onSignupClick, setIsLoginOpen }) => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoginOpen(true);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between sm:px-6 px-2 md:px-24 h-16">
      <Link href="/" className="flex items-center text-violet-300 text-lg font-bold">
          <img src="/logo.png" alt="Roj Code Logo" className="h-8 w-8 mr-2 pointer-events-none" />
          DailyCode
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link 
            href="/" 
            className="flex items-center text-violet-300 text-lg font-bold"
          >
            <List className="mr-1 h-5 w-5 text-violet-300" />
            Problems
          </Link>
          <Link 
            href="/practice" 
            className="flex items-center text-violet-300 text-lg font-bold"
          >
            <PlayCircle className="mr-1 h-5 w-5 text-violet-300" />
            Practice
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-2">
          {user ? (
            <button onClick={handleLogout} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-1 px-3 rounded">
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="flex items-center bg-violet-800 hover:bg-violet-900 text-white text-sm font-bold py-1 px-3 rounded"
              >
                <FaSignInAlt className='mr-1' />
                
                Sign In
              </button>
              <button
                onClick={onSignupClick}
                className="flex items-center bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold py-1 px-3 rounded"
              >
                <FaUserPlus className='mr-1' />
                Create Account
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-violet-300 mr-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
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
          {user ? (
            <button 
              onClick={() => { handleLogout(); toggleMenu(); }}
              className="block w-full text-left px-4 py-2 text-violet-300 text-lg font-bold"
            >
               
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => { onLoginClick(); toggleMenu(); }}
                className=" flex items-center w-full text-left px-4 py-2 text-violet-300 text-lg font-bold"
              >
                <FaSignInAlt className='mr-1' />
                Sign In
              </button>
              <button
                onClick={() => { onSignupClick(); toggleMenu(); }}
                className="flex items-center w-full text-left px-4 py-2 text-violet-300 text-lg font-bold"
              >
                <FaUserPlus className='mr-1' />
                Create Account
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;