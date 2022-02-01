import React, { useEffect, useState } from 'react'
import api from '../Utils/api';
import { DebouncedPicker } from '../Components/ColorPicker';
import { makeStyles } from '@mui/styles';
import Footer from '../Components/Footer';
import addIcon from "../Images/icons8-add-64.png";
import minusIcon from "../Images/icons8-minus-sign-64.png";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    background: '#D3BDB0',
    minHeight: '100%',
    minWidth: '100%',
  },
  pixelGameArea:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5%',
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

function Create() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [pixels, setPixels] = useState([])
  const [color, setColor] = useState('#000000')
  const [tool, setTool] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [update, setUpdate] = useState(false)
  const [showBorder, setShowBorder] = useState(true)
  const [width, setWidth] = useState(18)

  const getUserData = async() => {
    try{
      const data = await api.get('/users/')
      console.log(data)
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

  const handlePixelClick = async(id) => {
    switch(tool){
      case 0:
        handleChangePixelColor(id, selectedColor)
        break;
      case 1:
        handleChangePixelColor(id, '#FFFFFF')
        break;
      case 2:
        handleGetPixelColor(id);
        break;
      case 3: 
        deletePixel(id);
        break;
    }
  }
  
  const handleChangePixelColor = async (id, newColor) => {
    try{
      const pixelChangeReq = await api.patch('/pixels/' + id, { color: newColor })
      if(pixelChangeReq.status === 200){
        setUpdate(1)
      }
    } catch(err){
      console.error(err)
    }
  }

  const handleGetPixelColor = async (id) => {
    try{
      const getPixelColorReq = await api.get('/pixels/' + id)
      if(getPixelColorReq.status === 200){
        setSelectedColor(getPixelColorReq.data.color)
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

  const addPixel = async() => {
    try{
      const addPixelReq = await api.post('/pixels', {
        color : "#FFFFFF"
      })
      if(addPixelReq.status == 201){
        setUpdate(1)
      }
    } catch(err){ 
      console.error(err)
    }
  }

  const deletePixel = async(id) => {
    try{
      const deletePixelReq = await api.delete('/pixels/' + id, {
        id: id
      })
      if(deletePixelReq.status == 200){
        setUpdate(1)
        console.log(deletePixelReq)
      }
    } catch(err){ 
      console.error(err)
    }
  }

  const handleSaveToGallery = async() => {
    try{
      const saveReq = await api.post('/gallery', {
        width: width,
        pixels: pixels,
        date: new Date(),
        author: ["anonymous"]
      })
      console.log(saveReq)
      if(saveReq.status == 200){
        console.log('SUCCESS!')
      }
    } catch(err) {
      console.error(err)
    }
  }

  const canvasContents = pixels.map((pixel) => {
    let id = pixel._id
    return(
      <div 
        className={classes.pixel} 
        style={{
          background: pixel.color, 
          border: showBorder? '1px solid gray' : '', 
          width: showBorder? '18px' : '20px', 
          height: showBorder? '18px' : '20px' }} 
          onClick={() => handlePixelClick(id)}/>
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.pixelGameArea}>
        <div className={classes.canvas} style={{ width: width * 20 }}>
          {canvasContents}
        </div>
        <DebouncedPicker color={color} onChange={setColor} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        {selectedColor}
        <Footer className={classes.footer}
            tool={tool} 
            setTool={setTool} 
            showBorder={showBorder} 
            setShowBorder={setShowBorder} 
            handleSaveToGallery={handleSaveToGallery} 
            width={width}
            setWidth={setWidth}
            addPixel={addPixel}/> 
      </div>
    </div>
  )
}

export default Create;
