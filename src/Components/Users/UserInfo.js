import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import deafaultAvatar from '../../Images/icons8-customer-64.png';

function UserInfo() {
  const { user } = useAuth0();

  return (
    <div className='my-2'>
      <img className='mx-auto max-h-16 rounded-lg border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600' src={user.picture? user.picture : deafaultAvatar } alt='user'/> 
      <p className='max-w-16'>Currently logged in as {user.name}</p>
    </div>
  )
}

export default UserInfo