import React from 'react'
import Comment from './Comment'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const Comments = ({postId}) => {
  const fetchComments = async (slug) => {
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${slug}`);
      return response.data;
  }

  const {isPending , error , data} = useQuery({
        queryKey: ['comments', postId,],
        queryFn: () => fetchComments(postId),
    })

    if (isPending) return "Loading"
    if (error) return <div className='text-red-500'>Error: {error.message}</div>
    if (!data) return <div className='text-gray-500'>Post not found</div>

  return (
    <div className='flex flex-col gap-8 w-full lg:w-3/5'>
        <h1 className='text-xl text-gray-500 '>Comments</h1>
        <div className="flex items-center justify-between gap-8">
            <textarea placeholder='Write a comment' name="" className='w-full min-h-20 rounded-xl bg-white outline-0 p-2' id=""></textarea>
            <button className='bg-blue-800 text-white hover:opacity-85 transition-all duration-150 px-4 py-2 rounded font-medium'>Send</button>
        </div>
        <div className="flex flex-col gap-4">
          {data.map((comment , index) =>{
              <Comment key={comment._id} comment={comment}/>
          })}
            
        </div>
    </div>
  )
}

export default Comments