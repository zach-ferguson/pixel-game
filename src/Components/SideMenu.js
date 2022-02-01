import React from 'react';
import { makeStyles, mergeClasses } from '@mui/styles';
import addIcon from "../Images/icons8-add-64.png"
import minusIcon from "../Images/icons8-minus-sign-64.png"
import createIcon from "../Images/icons8-create-64.png"
import galleryIcon from "../Images/icons8-gallery-64.png"
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        marginRight: 'auto',
        marginTop: '2rem',
    },
    menuButton:{
        margin: '.25rem',
        borderRadius: '10px',
        transition: '.25s',
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
        alignItems: 'center'
    }
}))


function SideMenu() {
    const classes = useStyles();
    
  return (
    <div className={classes.root}>
        <Link to='/' className={classes.link}>
            <button className={classes.menuButton}>
                <img src={galleryIcon} /> 
            </button>
            <span>Gallery</span>
        </Link>
        <Link to='/create' className={classes.link}>
            <button className={classes.menuButton}>
                <img src={createIcon} /> 
            </button>
            <span>Create</span>
        </Link>
    </div>
  )
}

export default SideMenu;
