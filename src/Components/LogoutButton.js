import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logoutIcon from '../Images/icons8-logout-64.png'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'column', 
    margin: '.25rem',
    borderRadius: '10px',
    transition: '.2s',
    backgroundColor: '#715B64',
    '&:hover': {
      opacity: '50%',
      transition: '.25s',
      cursor: 'pointer',
    },
  }
}))


const LogoutButton = () => {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <div className={classes.container}>
      <button className={classes.button}>
        <img src={ logoutIcon } alt='login' onClick={() => logout({ returnTo: window.location.origin })} />
      </button>
      <span>Logout</span>
    </div>

  );
};

export default LogoutButton;