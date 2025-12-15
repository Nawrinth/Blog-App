import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowOutward } from "react-icons/md";
import MainCategories from '../components/MainCategories';
import FeaturedPost from '../components/FeaturedPost';
import PostList from '../components/PostList';
import { TiPlus } from "react-icons/ti";
import { toast } from 'react-toastify';
const HomePage = () => {
  const navigate = useNavigate();
  const {isLoaded , isSignedIn} = useUser();



  const handleWrite = () =>{
    if (!isSignedIn)
      toast.error("Login to share your story")
    else
      navigate("/write")
  }
  
  return (
    <div className=' mt-4 flex flex-col gap-4 '>
      {/* BreadCrump  */}
      <div className='flex gap-2'>
        <Link to='/' className=''>Home</Link>
        <span>•</span>
        <span className='text-blue-800 hover:underline'>Blogs and Articles</span>
      </div>
      
      {/* Introduction  */}
      <div className="flex items-center justify-between gap-4 ">
        {/* Titles  */}
        <div className="">
          <h1 className='text-gray-800 text-4xl md:text-5xl lf:text-6xl font-bold'>Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</h1>
          <p className='mt-4 md:mt-6 text-md md:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure iste voluptatibus voluptate blanditiis </p>

        </div>
        {/* button animated  */}
        <div onClick={handleWrite} className="hidden md:block">
          <div className="relative w-[200px] h-[200px]">
            <svg
              viewBox="0 0 200 200"
              height={200}
              width={200}
              className="text-lg tracking-wider text-gray-800 animatedButton animate-spin"
              // className="text-lg tracking-wider text-gray-800 animatedButton "
            >
              <path
                id="circlePath"
                d="
                  M 100,100 
                  m -60,0 
                  a 60,60 0 1,1 120,0 
                  a 60,60 0 1,1 -120,0
                "
                fill="none"
              />
              <text fill="currentColor" >
                <textPath href="#circlePath" startOffset="0%">
                  Write your story
                </textPath>
                <textPath href="#circlePath" startOffset="50%">
                  Share your idea
                </textPath>
              </text>
            </svg>

            <button className=" cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-800 text-white p-4 rounded-full flex items-center justify-center">
              <MdArrowOutward className='h-10 w-10' />
            </button>
          </div>
        </div>

      </div>
      {/* Categories  */}
      <MainCategories/>
      {/* Featured Post  */}
      <FeaturedPost/>
      {/* Post List  */}
      <div className="my-8">
        <h1 className="text-gray-400 font-medium text-xl">Recent Post's</h1>
        <PostList/>

      </div>
      {/* Compose Button Mobile  */}
        <button className='md:hidden px-5 py-3 fixed bottom-6 right-6 rounded-2xl bg-blue-800 flex gap-2 items-center justify-center text-white font-medium cursor-pointer hover:bg-blue-700 transition-all duration-200 ease-in'
        onClick={()=>navigate("/write")}>
          <TiPlus size={20} />
          Compose
        </button>
    </div>
  )
}

export default HomePage