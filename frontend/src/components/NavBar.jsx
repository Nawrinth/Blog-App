import React, { useState } from 'react'

import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import IKImage from './IKImage';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';

const NavBar = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(true);

    const {getToken} = useAuth();

    useEffect(()=>{
        getToken().then((token)=>console.log(token))
    },[])

  return (
    <div className='flex items-center justify-between h-16 md:h-20 py-4 px-6 w-full overflow-x-hidden'>
        {/* LOGO */}
        <Link to="/" className='flex gap-4 items-center '>
            <IKImage src="/logo.png" alt="logo" w={32} h={32}/>
            <span className='font-bold text-xl text-gray-700'>PostNest</span>
        </Link>
        {/* MOBILE LINKS  */}
        <div className="flex md:hidden">
            <div className="cursor-pointer" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                {openMobileMenu ?
                    <TbMenu2 className='h-6 w-6 '/>:
                    <IoClose className='h-6 w-6 '/>
                }
            </div>
         </div>
        {/* MOBILE MENU  */}
        
            
            <div className={`md:hidden w-full h-screen flex flex-col items-center transition-all ease-in-out duration-300 justify-center text-lg absolute gap-8 font-medium top-16 left-0 bg-[#f1f1f1]  ${ openMobileMenu ? "translate-x-[100%]" : "translate-x-[0%]"}`}>
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>
                <Link to="/" className='px-4 py-2 bg-blue-800 rounded-3xl text-white hover:opacity-90 transition-all duration-300'>
                    <button className='cursor-pointer'>Login</button>
                </Link>
            </div>
            

        

        {/* DESKTOP LINKS  */}
        <div className="hidden md:flex gap-8 xl:gap-12 font-medium items-center">
            <Link to="/">Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">Most Popular</Link>
            <Link to="/">About</Link>
             <SignedOut>
                <Link to="/login" className='px-4 py-2 bg-blue-800 rounded-3xl text-white hover:opacity-90 transition-all duration-300'>
                    <button className='cursor-pointer'>Login👋</button>
                </Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default NavBar