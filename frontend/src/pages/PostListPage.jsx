import React , {useState} from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'
import { FaFilter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const PostListPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className='  '>
        <h1 className='mb-8 text-2xl text-gray-500 font-semibold'>Development Blog</h1>
        <div className='flex flex-end w-full justify-end'>

           <button
              className='text-blue-800  cursor-pointer px-4 py-2 rounded-md mb-4 md:hidden flex gap-2 items-center'

              onClick={()=>setOpenFilter(!openFilter)}>
              {
                openFilter?<IoCloseSharp />:<FaFilter size={14}/>
              }
              {
                openFilter?"Close":"Filter"
              }
            </button>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className=''>
            <PostList/>
          </div>
          <div className={`${openFilter?'block':'hidden'} md:block `}>
            <SideMenu/>
          </div>
        </div>
    </div>
  )
}

export default PostListPage