import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import deafaultAvatar from '../../Images/icons8-customer-64.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root:{
    margin: '1rem 0 1rem 0'
  },
  userPicture:{
    width: '64px',
    height: '64px',
    borderRadius: '50px',
  },
  loggedInText:{
    margin: 0
  }
}))

function UserInfo() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {<img className={classes.userPicture} src={user.picture? user.picture : deafaultAvatar } alt='user-picture'/> }
      <p className={classes.loggedInText}>Currently logged in as {user.given_name? user.given_name : user.nickname }</p>
    </div>
  )
}

export default UserInfo