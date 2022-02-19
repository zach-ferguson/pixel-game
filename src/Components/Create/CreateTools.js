import React from 'react'
import { makeStyles } from '@mui/styles';
import dropperIcon from '../../Images/icons8-color-dropper-64.png';
import saveIcon from '../../Images/icons8-save-64.png';
import borderIcon from '../../Images/icons8-sewing-patch-64.png';
import plusIcon from '../../Images/icons8-plus-+-64.png'
import plusIcon2 from '../../Images/icons8-plus-+2-64.png'
import minusIcon from '../../Images/icons8-minus-64.png'
import deleteIcon from '../../Images/icons8-cancel-64.png'
import newIcon from '../../Images/icons8-image-file-add-64.png'
import editIcon from '../../Images/icons8-edit-50.png'
import eraseIcon from '../../Images/icons8-erase-50.png'

const useStyles = makeStyles(() => ({
    root:{
        width: '100%',
        height: '12%',
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
    toolbar:{
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
    },
    iconSection:{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    sectionIcons:{
      display: 'flex',
    },
    icon:{
        '&:hover':{        
          cursor: 'pointer',
          opacity: '50%',
        },
        width: '50px',
        margin: '.5rem',
    },
    selectedIcon:{
        border: '1px solid black',
        width: '50px',
        margin: '.5rem',
        borderRadius: '10px',
        '&:hover':{        
          cursor: 'pointer'
        }
    },
    divider:{
      backgroundColor: 'black',
      width: '1px',
      height: '45px',
      margin: 'auto .5rem auto .5rem'
    },
    sectionTitle:{
      alignSelf: 'center'
    },
  }))

  const handleNew = () => {
    console.log("creating new piece")
    // open modal
    // do you want to save changes?
    // handle save
    // clear pixel data
    // modal prompt for number of pixels number of pixels
    // use to determine width and number of pixels
  }

function CreateTools(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <div className={classes.toolbar}>
            <div className={classes.iconSection}>
              <span className={classes.sectionTitle}>Tools</span> 
              <div className={classes.sectionIcons}>
                <img className={props.tool === 0? classes.selectedIcon : classes.icon} alt='edit' src={ editIcon } onClick={() => { props.setTool(0) }}/>
                <img className={props.tool === 1? classes.selectedIcon : classes.icon} alt='erase' src={ eraseIcon } onClick={() => { props.setTool(1) }}/>
                <img className={props.tool === 2? classes.selectedIcon : classes.icon} alt='dropper' src={ dropperIcon } onClick={() => { props.setTool(2) }}/>
              </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.iconSection}>
              <span className={classes.sectionTitle}>Pixels</span>
              <div className={classes.sectionicons}>
                <img className={classes.icon} src={plusIcon2} alt='add-pixel' onClick={() => { props.addPixel(); }}/>
                <img className={props.tool === 3? classes.selectedIcon : classes.icon} alt='remove-pixel' src={ deleteIcon } onClick={() => { props.setTool(3) }}/>
                </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.iconSection}>
              <span className={classes.sectionTitle}>Width</span>
              <div className={classes.sectionicons}>
                <img className={classes.icon} src={ plusIcon } alt='add-pixel' onClick={() => { props.setWidth(props.width + 1) }}/>
                <img className={classes.icon} src={ minusIcon } alt='remove-pixel' onClick={() => { props.setWidth(props.width - 1) }}/>
              </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.iconSection}>
              <span className={classes.sectionTitle}>Utilities</span>
              <div className={classes.sectionicons}>
                <img className={classes.icon} src={ borderIcon } alt='border' onClick={() => { props.setShowBorder( !props.showBorder ); }}/>
                <img className={classes.icon} src={ saveIcon } alt='save' onClick={() => { props.handleSaveToGallery(); }}/>
                <img className={classes.icon} src={ newIcon } alt='new' onClick={() => { handleNew(); }}/>
              </div>
            </div>
          </div>
          <span className={classes.creditText}>
            Icons gratefully sourced from <a href={'https://icons8.com/'}>https://icons8.com/</a>
          </span>
        </div>
    )
}

export default CreateTools
