import React from 'react'
import { Link, useParams } from 'react-router-dom'
import IKImage from '../components/IKImage'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from "timeago.js"

const fetchPost = async (slug) => {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return response.data;
}

const SinglePostPage = () => {
    const { slug } = useParams();
    console.log(slug)

    const {isPending , error , data} = useQuery({
        queryKey: ['post', slug,],
        queryFn: () => fetchPost(slug),
    })

    if (isPending) return "<LoadingScreen />"
    if (error) return <div className='text-red-500'>Error: {error.message}</div>
    if (!data) return <div className='text-gray-500'>Post not found</div>
  return (
    <div className='flex flex-col gap-8 mt-2 pb-4'>
        {/* detail   */}
        <div className='flex gap-8'>
            <div className="lg:w-3/5 flex flex-col gap-8">
                <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-800'>
                    {data.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span>Written by</span>
                    <Link className='text-blue-800 hover:underline capitalize'>{data.user.username}</Link>
                    <span>on</span>
                    <Link className='text-blue-800 hover:underline capitalize'>{data.category}</Link>
                    <span>{format(data.createdAt)}</span>
                </div>
                <p className='text-gray-600 font-medium'>
                    {data.desc}
                    </p>
            </div>
            <div className='hidden lg:block w-2/5 rounded-3xl'>
                <IKImage src={data.img?data.img:"postImg.jpeg"} w={600} className=" rounded-3xl"/>   
            </div>
        </div>      
        {/* content  */}
        <div className='flex flex-col md:flex-row gap-8 w-full'>
            {/* text  */}
            <div className="lg:text-[18px] flex flex-col gap-2 w-4/5 text-justify " dangerouslySetInnerHTML={{ __html: data.content }}>
                
            </div>
        
            {/* menu  */}
            <div className="px-4 h-max sticky top-8 w-1/5">
                <h1  className=' mb-4 text-sm font-medium'>Author</h1>
                <div className=''>
                    <div className="flex items-center gap-6 mb-4 font-medium">
                        <IKImage src={"userCommon.webp"} w={48} h={48} className="h-12 w-12 rounded-full object-cover"/>
                        <Link className='capitalize'>{data.user.username}</Link>
                    </div>
                    {/* Desc  */}
                    <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    <div className="flex gap-4 mt-1">
                        <Link>
                            <IKImage src="/facebook.svg" w={20} h={20} className="h-6 w-6 object-cover"/>
                        </Link>
                        <Link>
                            <IKImage src="/instagram.svg" w={20} h={20} className="h-6 w-6 object-cover"/>
                        </Link>
                    </div>
                </div>
                <PostMenuAction/>
                {/* Categories  */}
                <h1  className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
                <div className="flex flex-col gap-1 text-sm ">
                    <Link className='underline '>All</Link>
                    <Link className='underline '>Web Design</Link>
                    <Link className='underline '>Development</Link>
                    <Link className='underline '>Database</Link>
                    <Link className='underline '>Search Engine</Link>
                    <Link className='underline '>Marketing</Link>

                </div>
                <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
                <Search/>
            </div>
        </div>
        <Comments postId={data._id}/>
    </div>
  )
}

export default SinglePostPage