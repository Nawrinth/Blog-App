import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex bg-[#f1f1f1] w-screen absolute top-0 left-0 items-center justify-center h-screen '>
      <SignIn  signUpUrl='/register'/>
    </div>
  )
}

export default LoginPage