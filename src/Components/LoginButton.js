import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import loginIcon from '../Images/icons8-key-64.png'
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


const LoginButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={classes.container}>
      <button className={classes.button}>
        <img src={ loginIcon } alt='login' onClick={() => loginWithRedirect()} />
      </button>
      <span>Login</span>
    </div>
  )
};

export default LoginButton;