import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='flex bg-[#f1f1f1] w-screen absolute top-0 left-0 items-center justify-center h-screen'>
      <SignUp signInUrl='/login'/>
    </div>
  )
}

export default RegisterPage