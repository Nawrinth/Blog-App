import React from 'react'
import IKImage from './IKImage'
import { Link } from 'react-router-dom'
import { format } from "timeago.js"

const PostListItem = ({post}) => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-8'>
      {/* Image  */}

      <div className="md:hidden xl:flex flex justify-center w-full  xl:w-1/3">
        <IKImage w={735} src={post.img?post.img : "/postImg.jpeg"} className="rounded-2xl object-fill"/>
      </div>
      {/* Details  */}
      <div className='flex flex-col gap-4 w-full xl:w-2/3'>
        <Link to={`/${post.slug}`} className='text-4xl font-semibold text-gray-800'>
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400  text-sm ">
          <span>Written by</span>
          <Link className='text-blue-800 capitalize'>{post.user.username}</Link>
          <span>on</span>
          <Link className='text-blue-800 capitalize'>{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>
          {post.desc} 
        </p>
        <Link to={`/${post.slug}`} className='text-blue-800  hover:underline underline-offset-2 text-sm'>Read more</Link>
      </div>
    </div>
  )
}

export default PostListItem