'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/components/firebase/firebaseConfig'; // Your Firebase configuration
import Navbar from '@/components/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';
import ForgotPasswordModal from '@/components/modals/ForgetPasswordModal';
import Spinner from '@/components/Spinner'; // Import Spinner component
import { FaSignInAlt, FaUserPlus, FaLock, FaExclamationTriangle } from 'react-icons/fa'; // Import icons

const Authpage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        router.push('/');
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(false);
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(false);
    setIsSignupOpen(true);
  };

  const openForgotPassword = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(true);
  };

  if (isLoading) return <Spinner />; // Show spinner while loading

  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen relative px-4'>
      <div className='max-w-7xl mx-auto'>
        <Navbar 
          onLoginClick={openLogin}
          onSignupClick={openSignup}
          setIsLoginOpen={setIsLoginOpen}
        />
        <div className='text-center text-white pt-24'>
          {!isAuthenticated ? (
            <>
              <h1 className='text-2xl font-bold mb-16 text-cyan-300'>
                <FaExclamationTriangle className='inline-block mr-2 text-3xl text-red-600' />
                Please log in or sign up to continue
              </h1>
              <div className='lg:hidden flex justify-center space-x-8'>
                <button onClick={openLogin} className='flex items-center bg-violet-700 text-white rounded-lg px-3 py-1 text-sm font-bold hover:bg-cyan-600 transition duration-200 mb-4'>
                  <FaSignInAlt className='mr-1' />
                  Log In
                </button>
                <button onClick={openSignup} className='flex items-center bg-cyan-700 text-white rounded-lg px-3 py-1 text-sm font-bold hover:bg-violet-600 transition duration-200 mb-4'>
                  <FaUserPlus className='mr-1' />
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <h1 className='text-3xl font-bold mb-6'>Welcome Back!</h1>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onCreateAccountClick={openSignup}
        onForgotPasswordClick={openForgotPassword}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onLoginClick={openLogin}
      />
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />
    </div>
  );
};

export default Authpage;
