import React from 'react'
import { MdOutlineSearch } from "react-icons/md";

const Search = () => {
  return (
    <div className='bg-gray-200 w-max  p-2 rounded-full text-[14px] flex items-center gap-2'>
        <MdOutlineSearch />
        <input type="text" className='bg-transparent w-fit outline-0' placeholder='Search a post...' />
    </div>
  )
}

export default Search