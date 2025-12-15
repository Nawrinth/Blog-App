import React from 'react'
import IKImage from './IKImage'
import { Link } from 'react-router-dom'

const FeaturedPost = () => {
  return (
    <div className='flex flex-col md:flex-row mt-10 gap-8'>
      {/* Main Featured  */}
      <div className='flex flex-col md:w-1/2 gap-4 '>
          <IKImage src="/featured1.jpeg" className="object-cover rounded-3xl w-full md:w-auto" w={895}/>
          <div className='flex flex-row items-center gap-4 font-semibold'>
            <h1 className='text-lg '>01. </h1>
            <h1 className='text-lg text-blue-800 hover:underline'>Web Design</h1>
            <span className='text-gray-600 text-xs'>(2 days ago)</span>
          </div>
          <Link to="/tests" className='text-3xl md:text-3xl font-bold text-gray-800 t'>
            Lorem ipsum dolor, sit amet conse ctetur adipisicing elit.
          </Link>
      </div>

      {/* Others  */}
      <div className='flex flex-col lg:w-1/2 gap-8 mt-8 md:mt-0 w-full'>
        {/* Second */}
        <div className="flex justify-between gap-8 lg:h-1/3"> 
          <div className=' w-1/3 '>
            <IKImage w={298} src="/featured2.jpeg" className="object-fill rounded-2xl aspect-6/4" />
          </div>
          <div className='flex flex-col  gap-2 w-2/3'>
            <div className="flex flex-row items-center gap-4 ">
              <h1 className="text-[16px] md:text-[18px] font-medium">02. </h1>
              <h1 className="text-[16px] md:text-[18px] font-medium text-blue-800 hover:underline">Wed Design</h1>
              <span className='text-gray-600 text-xs'>(4 days ago)</span>
            </div>
            <Link to="/tests" className='font-medium text-[16px] md:text-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
          </div>
        </div>

        {/* Third  */}
        <div className="flex items-start gap-8  lg:h-1/3"> 
          <div className=' w-1/3'>
            <IKImage w={298} src="/featured3.jpeg" className="object-fill rounded-2xl aspect-6/4" />
          </div>
          <div className='flex flex-col justify-center gap-2 w-2/3 '>
            <div className="flex flex-row items-center gap-4">
              <h1 className="text-[16px] md:text-[18px] font-medium">03. </h1>
              <h1 className="text-[16px] md:text-[18px] font-medium text-blue-800 hover:underline">Wed Design</h1>
              <span className='text-gray-600 text-xs'>(4 days ago)</span>
            </div>
            <Link to="/tests" className='font-medium text-[16px] md:text-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
          </div>
        </div>
        

        {/* Fourth  */}
        <div className="flex items-start gap-8  lg:h-1/3"> 
          <div className=' w-1/3 '>
            <IKImage w={298} src="/featured4.jpeg" className="object-fill rounded-2xl aspect-6/4" />
          </div>
          <div className='flex flex-col justify-center gap-2 w-2/3 '>
            <div className="flex flex-row items-center gap-4 ">
              <h1 className="text-[16px] md:text-[18px] font-medium">04. </h1>
              <h1 className="text-[16px] md:text-[18px] font-medium text-blue-800 hover:underline">Development</h1>
              <span className='text-gray-600 text-xs'>(4 days ago)</span>
            </div>
            <Link to="/tests" className='font-medium text-[16px] md:text-xl '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default FeaturedPost