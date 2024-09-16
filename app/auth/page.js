import React from 'react'
import Navbar from '@/components/Navbar'

const Authpage = () => {
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
    <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='text-center'>
            <h1>Auth page</h1>
        </div>
    </div>
    </div>
  )
}

export default Authpage
