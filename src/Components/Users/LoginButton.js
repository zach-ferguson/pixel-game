import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loginIcon from '../../Images/icons8-key-64.png'
import logoutIcon from '../../Images/icons8-logout-64.png'

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='my-1 flex-col items-center'>
      <button className='w-16 h-16 mx-auto flex justify-center items-center rounded-lg bg-secondary transition ease-in-out duration-100 hover:opacity-50 hover:cursor-pointer border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600'>
        <img className='w-10 h-10' 
          src={ isAuthenticated? logoutIcon : loginIcon } 
          alt={isAuthenticated? 'logout' : 'login'}
          onClick={isAuthenticated? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect()} />
      </button>
      <span>{isAuthenticated? 'Logout' : 'Login'}</span>
    </div>
  )
};

export default LoginButton;