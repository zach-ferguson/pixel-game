import React, { useEffect, useState } from 'react'
import api from './Utils/api';
import { DebouncedPicker } from './Components/ColorPicker';
import { makeStyles } from '@mui/styles';
import Footer from './Components/Footer';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minWidth: '100vh',
    minHeight: '100vh',
    height: '100%',
    background: '#D3BDB0',
  },
  pixelGameArea:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20%',
  },
  canvas:{
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2rem',
  },
  pixel: {
    '&:hover':{
      cursor: 'pointer',
    },
  },
  colorPicker:{
    marginTop: '300px',
  }, 
  footer:{ 
    width: '100%',
    height: '10%',
    position: 'fixed',
    bottom: 0,
  },
  creditText:{

  }
}))

function App() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [pixels, setPixels] = useState([])
  const [color, setColor] = useState('#000000')
  const [tool, setTool] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [update, setUpdate] = useState(false)
  const [showBorder, setShowBorder] = useState(true)

  const WIDTH = 10

  const getUserData = async() => {
    try{
      const data = await api.get('/users/')
      setData(data.data)
    } catch(err){
      console.error(err)
    }
  }

  const getPixelData = async() => {
    try{
      const pixels = await api.get('/pixels')
      setPixels(pixels.data)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserData();
    getPixelData();
  },[])

  const handleChangePixel = async(id) => {
    try{
      let newColor
      switch(tool){
        case 0:
          newColor = selectedColor
          break;
        case 1:
          newColor = '#FFFFFF'
          break;
      }
      const pixelChangeReq = await api.patch('/pixels/' + id, {
        color: newColor
      })
      if(pixelChangeReq.status == 200){
        setUpdate(1)
      }
    } catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    if(update == true){
      getPixelData();
      setUpdate(!update)
    }
  },[update])

  const canvasContents = pixels.map((pixel) => {
    let id = pixel._id
    return(
      <div className={classes.pixel} style={{ background: pixel.color, border: showBorder? '1px solid gray' : '', width: showBorder? '18px' : '20px', height: showBorder? '18px' : '20px' }} onClick={() => handleChangePixel(id)}/>
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.pixelGameArea}>
        <button onClick={() => { setShowBorder(!showBorder) }}>
          {showBorder? "Hide border" : 'Show Border'} 
        </button>
        <div className={classes.canvas} style={{ width: WIDTH * 20 }}>
          {canvasContents}
        </div>
        <DebouncedPicker color={color} onChange={setColor} setSelectedColor={setSelectedColor}/>
        {selectedColor}
        <Footer className={classes.footer} tool={tool} setTool={setTool}/> 
      </div>
    </div>
  );
}

export default App;
