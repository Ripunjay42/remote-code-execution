import React from 'react';
import Topbar from '@/components/Topbar';
import ProblemTable from '@/components/ProblemTable';
import { FaCode, FaLaptopCode, FaCoffee } from 'react-icons/fa'; // Import the coffee icon

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-black bg-center min-h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Topbar />
        <div className='text-center text-white mt-24'>
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
            {/* Add more icons as needed */}
          </div>
          <div className='max-w-4xl mx-auto'>
              <ProblemTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
