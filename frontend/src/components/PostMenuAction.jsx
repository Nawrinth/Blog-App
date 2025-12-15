import React from 'react'

const PostMenuAction = () => {
  return (
    <div className=''>
        <h1  className='mt-4 mb-2 text-sm font-medium'>Actions</h1>
        <div className="flex items-center gap-2 py-1 text-sm cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="black" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                width="20" 
                height="20"
                >
            <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z" />
            </svg>
            <p>Save this post</p>

        </div>
        <div className="flex items-center gap-2 py-1 text-sm cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke={"#ff5c33"}
                width={20}
                height={20  }
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 7h12M9 7V4h6v3M10 11v6m4-6v6M5 7h14l-1 13H6L5 7z"
                />
            </svg>
            <p className=''>Delete this post</p>
        </div>
    </div>
  )
}

export default PostMenuAction