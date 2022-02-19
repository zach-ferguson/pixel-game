import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import createIcon from "../Images/icons8-create-64.png"
import galleryIcon from "../Images/icons8-gallery-64.png"
import loadingSpinner from "../Images/icons8-loading-sign-64.png"
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from './Gallery/UserInfo';

const useStyles = makeStyles(() => ({
    root: {
        width: '100px',
        maxWidth: '100px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        marginRight: 'auto',
        marginTop: '2rem',
        marginLeft: '1rem'
    },
    menuButton:{
        margin: '.25rem',
        borderRadius: '10px',
        transition: '.2s',
        backgroundColor: '#715B64',
        '&:hover': {
            opacity: '50%',
            transition: '.25s',
            cursor: 'pointer',
        }
    },
    link:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        textDecoration: 'none'
    },
    loginSection: {
        marginTop: 'auto',
        marginBottom: '100px',
        textAlign: 'center'
    },
    loadingSpinner:{
        marginTop: 'auto',
        marginBottom: '100px',
        textAlign: 'center',
        animation: `$spin 1s linear infinite`
    },
    "@keyframes spin": {
        '0%':{
            transform: 'rotate(0deg)'

        },
        '100%':{
            transform: 'rotate(360deg)'
        }
    },
}))


function SideMenu() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles();
    
    useEffect(() => {
        console.log(user)
    },[user])
    

  return (
    <div className={classes.root}>
        <Link to='/' className={classes.link}>
            <button className={classes.menuButton}>
                <img alt='gallery' src={galleryIcon} /> 
            </button>
            <span>Gallery</span>
        </Link>
        <Link to='/create' className={classes.link}>
            <button className={classes.menuButton}>
                <img alt='create' src={createIcon} /> 
            </button>
            <span>Create</span>
        </Link>
        {isLoading? <img alt='loading-spinner' className={classes.loadingSpinner} src={ loadingSpinner }/> : 
            <div id='login-section' className={classes.loginSection}> 
                { user? <LogoutButton /> : <LoginButton /> }
                { user && (
                    <UserInfo/>
                )}
            </div>
        }
    </div>
  )
}

export default SideMenu;
