import React from 'react';
import Topbar from '@/components/Topbar';
import ProblemTable from '@/components/ProblemTable';
import { FaCode, FaLaptopCode, FaCoffee, FaLinkedin } from 'react-icons/fa'; // Import the LinkedIn icon

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-black bg-center min-h-screen relative px-4'>
      <div className='max-w-7xl mx-auto'>
        <Topbar />
        <div className='text-center text-white mt-28'>
          <h1 className='text-4xl text-violet-300 font-extrabold mb-8'>
            Welcome to Coding Challenges
          </h1>
          <div className='flex justify-center space-x-4 mb-8'>
            <div className='flex flex-col items-center'>
              <FaLaptopCode className='text-6xl' />
              <span className='mt-2 text-lg'>Develop</span>
            </div>
            <div className='flex flex-col items-center'>
              <FaCode className='text-6xl' />
              <span className='mt-2 text-lg'>Code</span>
            </div>
            <div className='flex flex-col items-center'>
              <FaCoffee className='text-6xl' />
              <span className='mt-2 text-lg'>Coffee</span>
            </div>
          </div>
          <div className='max-w-3xl mx-auto'>
            <ProblemTable />
          </div>

          <div className='text-center mt-24 text-white'>
          <p className='text-md text-violet-300'>Developed by Ripunjay Choudhury</p>
          <a
            href='https://www.linkedin.com/in/ripunjay-choudhury-83864524b/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center mt-2 text-blue-500 hover:text-violet-500 transition-colors'
          >
            <FaLinkedin className='mr-2 text-2xl' /> Connect on LinkedIn
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default page;
