import React from 'react';
import createIcon from "../../Images/icons8-create-64.png"
import galleryIcon from "../../Images/icons8-gallery-64.png"
import bugIcon from "../../Images/icons8-bug-64.png"
import loadingSpinner from "../../Images/icons8-loading-sign-64.png"
import { Link } from 'react-router-dom';
import LoginButton from '../Users/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from '../Users/UserInfo';

function SideMenu() {
    const { user, isLoading } = useAuth0();

  return (
    <div className='absolute w-28 h-full flex-col items-center left-0 invisible md:visible'>
      <Link to='/' className='m-1 flex-col items-center justify-center'>
        <button className='w-16 h-16 mx-auto flex justify-center items-center rounded-lg bg-secondary transition ease-in-out duration-100 hover:opacity-50 hover:cursor-pointer border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600'>
          <img className='w-12 h-12' alt='gallery' src={galleryIcon} />
        </button>
        <p className='w-fit mx-auto'>Gallery</p>
      </Link>
      <Link to='/create' className='my-1 flex-col items-center'>
        <button className='w-16 h-16 mx-auto flex justify-center items-center rounded-lg bg-secondary transition ease-in-out duration-100 hover:opacity-50 hover:cursor-pointer border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600'>
          <img className='w-14 h-14' alt='create' src={createIcon} /> 
        </button>
        <p className='w-fit mx-auto'>Create New</p>
      </Link>
      {isLoading? <img alt='loading-spinner' className='animate-spin mx-auto mt-24' src={ loadingSpinner }/> : 
        <div id='login-section' className='text-center mt-24'> 
          <LoginButton />
          { user && <UserInfo/> }
        </div>
      }
      <Link to="531" className='my-1 flex-col items-center'>
        <button className='w-16 h-16 mt-6 mx-auto flex justify-center items-center rounded-lg bg-secondary transition ease-in-out duration-100 hover:opacity-50 hover:cursor-pointer border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600'>
          <img className='w-12 h-12' alt='bug-icon' src={ bugIcon }/>
        </button>
        <p className='w-fit mx-auto'>5/3/1</p>
      </Link>
      <a href="mailto:z.h.ferguson@gmail.com" className='w-fit h-fit flex-col items-center justify-center'>
        <button className='w-16 h-16 mt-6 mx-auto flex justify-center items-center rounded-lg bg-secondary transition ease-in-out duration-100 hover:opacity-50 hover:cursor-pointer border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600'>
          <img className='w-12 h-12' alt='bug-icon' src={ bugIcon }/>
        </button>
        <p className='w-fit mx-auto'>Report Bug</p>
      </a>
    </div>
  )
}

export default SideMenu;
