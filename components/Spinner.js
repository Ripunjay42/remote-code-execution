// components/Spinner.js
import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
    <div className="w-16 h-16 border-4 border-t-transparent border-violet-400 border-solid rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
