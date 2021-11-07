import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root:{
        width: '100%',
        height: '10%',
        position: 'fixed',
        bottom: 0,
        background: '#715B64'
    },
    creditText:{
        fontSize: '10px',
        position: 'fixed',
        bottom: 0,
        right: 0,
        color: '#C1AE9F'
    },
    icons:{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '150px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
    },
    icon:{
        '&:hover':{        
          cursor: 'pointer'
        }
    },
    selectedIcon:{
        border: '1px solid black',
        width: '49px',
        borderRadius: '10px',
        '&:hover':{        
          cursor: 'pointer'
        }
    }
  }))

function Footer(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <div className={classes.icons}>
            <img className={props.tool == 0? classes.selectedIcon : classes.icon} src={process.env.PUBLIC_URL + '/icons8-edit-50.png'} onClick={() => { props.setTool(0) }}/>
            <img className={props.tool == 1? classes.selectedIcon : classes.icon} src={process.env.PUBLIC_URL + '/icons8-erase-50.png'} onClick={() => { props.setTool(1) }}/>
            {/*   <img className={props.tool == 2? classes.selectedIcon : classes.icon} src={process.env.PUBLIC_URL + '/icons8-paint-palette-50.png'} onClick={() => { props.setTool(2) }}/>   */}
          </div>
          <span className={classes.creditText}>
            Icons gratefully sourced from <a href={'https://icons8.com/'}>https://icons8.com/</a>
          </span>
        </div>
    )
}

export default Footer
