import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className='px-4 h-max sticky top-8'>
        <h1 className='mb-4 text-sm font-medium text'>Search</h1>
        <Search/>
        <h1 className='mt-8 mb-4 text-sm font-medium text'>Filter</h1>
        <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input type="radio" value={"newest"} className='bg-white appearance-none h-4 w-4 border-[1.5px] border-blue-800 cursor-pointer rounded checked:bg-blue-800' name="" id="" />
                Newest
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input type="radio" value={"most-popular"} className='bg-white appearance-none h-4 w-4 border-[1.5px] border-blue-800 cursor-pointer rounded checked:bg-blue-800' name="" id="" />
                Most Popular
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input type="radio" value={"trending"} className='bg-white appearance-none h-4 w-4 border-[1.5px] border-blue-800 cursor-pointer rounded checked:bg-blue-800' name="" id="" />
                Trending
            </label>
            <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
                <input type="radio" value={"oldest"} className='bg-white appearance-none h-4 w-4 border-[1.5px] border-blue-800 cursor-pointer rounded checked:bg-blue-800' name="" id="" />
                Oldest
            </label>
            
        </div>
        <h1 className='mt-8 mb-4 text-sm font-medium text'>Category</h1>
        <div className="flex flex-col gap-1 text-sm ">
            <Link to="/posts" className='underline hover:text-blue-800'>All</Link>
            <Link to="/posts?cat=web-design" className='underline hover:text-blue-800'>Web Design</Link>
            <Link to="/posts?cat=development" className='underline hover:text-blue-800'>Development</Link>
            <Link to="/posts?cat=database" className='underline hover:text-blue-800'>Database</Link>
            <Link to="/posts?cat=seo" className='underline  hover:text-blue-800'>Search Engine</Link>
            <Link to="/posts?cat=marketing" className='underline hover:text-blue-800'>Marketing</Link>

        </div>
    </div>
  )
}

export default SideMenu