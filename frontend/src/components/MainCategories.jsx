import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-gray-50 shadow-lg rounded-3xl p-4 items-center justify-center gap-8">
        {/* Links  */}
        <div className="flex-1 flex items-center gap-2 flex-wrap">
            <Link to="/posts" className='bg-blue-800 text-white rounded-full px-4 py-2'>All Posts</Link>
            <Link to="/posts?cat=web-design" className='hover:bg-blue-50 rounded-full px-4 py-2'>Web Design</Link>
            <Link to="/posts?cat=development" className='hover:bg-blue-50 rounded-full px-4 py-2'>Development</Link>
            <Link to="/posts?cat=database" className='hover:bg-blue-50 rounded-full px-4 py-2'>Database</Link>
            <Link to="/posts?cat=seo" className='hover:bg-blue-50 rounded-full px-4 py-2'>Search Engines</Link>
            <Link to="/posts?cat=marketing" className='hover:bg-blue-50 rounded-full px-4 py-2'>Marketing</Link>
        </div>

        <span className='font-bold text-xl text-gray-500'>|</span>
        {/* Search  */}
        <div className="bg-gray-100 rounded-full p-2 flex items-center gap-2">
            <FaSearch className='text-gray-800'/>
            <input type="text" placeholder='Search posts' className='outline-0 border-0' />
        </div>

    </div>
  )
}

export default MainCategories