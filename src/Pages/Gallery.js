import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import api from '../Utils/api';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#D3BDB0',
        minHeight: '100%',
        minWidth: '100%',
        margin: 'auto auto auto auto',
    },
    galleryDisplay:{
        display: 'flex',
        flexWrap: 'wrap',
        width: '464px',
        marginTop: '2rem',
    },
    galleryItem:{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '25px',
        background: 'white',
        margin: '1rem',
        width: '200px',
        height: 'fit-content',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    contents:{
        marginLeft: '2rem',
    }
}))

function Gallery() {
  const classes = useStyles();
  const [galleryData, setGalleryData] = useState([]);

  const getGalleryData = async() => {
    try{
      const galleryDataReq = await api.get('/gallery')
      setGalleryData(galleryDataReq.data)
      console.log(galleryDataReq.data)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getGalleryData();
  },[])

  const galleryItems = galleryData.map((galleryItem) => {
    return(
      <div className={classes.galleryItem}>
          <div className={classes.contents}>
              <p>Author: {galleryItem.author}</p>
              <p>Created on: {galleryItem.date}</p>
              <p>pixel count: {galleryItem.pixels.length}</p>
          </div>
      </div>
    )
  })

  return (
    <div className={classes.root}>
      <h1>Gallery</h1>
        <div className={classes.galleryDisplay}>
            {galleryItems}
        </div>
    </div>
  )
}

export default Gallery;
