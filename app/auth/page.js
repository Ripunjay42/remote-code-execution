'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/components/firebase/firebaseConfig'; // Your Firebase configuration
import Navbar from '@/components/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';
import ForgotPasswordModal from '@/components/modals/ForgetPasswordModal';
import Spinner from '@/components/Spinner'; // Import Spinner component

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
       // Stop loading after authentication check
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
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Navbar 
          onLoginClick={openLogin}
          onSignupClick={openSignup}
          setIsLoginOpen={setIsLoginOpen}
        />
        <div className='text-center text-white pt-20'>
          {!isAuthenticated ? (
            <>
              <h1 className='text-2xl font-bold mb-16 text-cyan-300'>Please log in or sign up to continue</h1>
              {/* <p className='mb-2 text-cyan-600 text-lg'>Please log in or sign up to continue</p> */}
            </>
          ) : (
            <h1 className='text-3xl font-bold mb-6'>Welcome </h1>
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
