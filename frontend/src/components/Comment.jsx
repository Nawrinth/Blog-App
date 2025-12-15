import React from 'react'
import IKImage from './IKImage'

const Comment = ({comment}) => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl'>
        <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
                
                <IKImage src="./userImg.jpeg" alt={""} className="w-8 h-8 rounded-full object-cover" w={40}/>
                <span className='font-medium'>Jon Snow</span>
            </div>
            <span className='text-sm text-gray-400'>2 days ago</span>
        </div>
        <div className='text-gray-800 mt-2'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus exercitationem vero porro illum voluptates explicabo magnam aspernatur iusto, laborum in itaque est! Quod consequuntur tempore facilis officiis quam quae doloribus?</p>
        </div>
    </div>
  )
}

export default Comment