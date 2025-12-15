import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black z-50 opacity-50'>
        <div className='loading-bounce'>
            <span></span>
            <span></span>
            <span></span>
        </div>
        
    </div>
  )
}

export default LoadingScreen