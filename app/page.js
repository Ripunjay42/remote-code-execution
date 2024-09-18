import React from 'react'
import Topbar from '@/components/Topbar'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Topbar />
        <div className='text-center text-white mt-20'>
          <h1 className='text-3xl text-violet-300 font-extrabold'>WELLCOME</h1>
        </div>
      </div>
    </div>
  )
}

export default page