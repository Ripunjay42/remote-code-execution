'use client';
import React from 'react';
import Topbar from '@/components/Topbar';
import ProblemTable from '@/components/ProblemTable';
import { FaCode, FaLaptopCode, FaCoffee, FaLinkedin } from 'react-icons/fa'; // Import the LinkedIn icon
import { motion } from 'framer-motion'; // Import framer-motion for animations

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-black bg-center min-h-screen relative px-4'>
      <div className='max-w-7xl mx-auto'>
        <Topbar />
        <div className='text-center text-white mt-16 md:mt-24 lg:mt-28 relative'>
          {/* Firecracker spark effects directly to the left and right of the text */}
          {/* <div className='firework firework-left'></div>
          <div className='firework firework-right'></div> */}
          
          <motion.h1 
            className='text-4xl text-violet-300 font-extrabold mb-8 pulsing-text relative z-1'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.09, ease: 'easeInOut' }}
          >
            Coding Challenges
          </motion.h1>

          <motion.div 
            className='flex justify-center space-x-4 mb-8'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.div 
              className='flex flex-col items-center hover:text-violet-300 transition-colors'
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaLaptopCode className='text-6xl mb-2' />
            </motion.div>
            <motion.div 
              className='flex flex-col items-center hover:text-violet-300 transition-colors'
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaCode className='text-6xl mb-2' />
            </motion.div>
            <motion.div 
              className='flex flex-col items-center hover:text-violet-300 transition-colors'
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaCoffee className='text-6xl mb-2' />
            </motion.div>
          </motion.div>

          <motion.div
            className='max-w-3xl mx-auto'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4, ease: 'easeInOut' }}
          >
            <ProblemTable />
          </motion.div>

          <motion.div
            className='text-center mt-24 text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.09, duration: 0.6 }}
          >
            <p className='text-md text-violet-300'>
              Developed by <span className='text-md font-extrabold text-cyan-400'>Ripunjay Choudhury</span>
            </p>
            <a
              href='https://www.linkedin.com/in/ripunjay-choudhury-83864524b/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center mt-2 text-blue-400 hover:text-violet-500 transition-colors'
            >
              <FaLinkedin className='mr-2 text-2xl animate-pulse' /> Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
