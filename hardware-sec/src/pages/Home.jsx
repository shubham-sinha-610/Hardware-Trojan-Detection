import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Home = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-24 mt-10 w-full'>
        <h1 className='text-3xl text-gray-700 font-bold uppercase'>Hardware Security</h1>
        <SignIn />
    </div>
  )
}

export default Home