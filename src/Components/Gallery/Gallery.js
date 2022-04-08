import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGalleryItems, selectGalleryItemById, selectGalleryItemIds } from './gallerySlice';
import loadingSpinner from "../../Images/icons8-loading-sign-64.png"
import { parseISO } from 'date-fns';

let GalleryItem = ({ galleryItemId }) => {
  const galleryItem = useSelector(state => selectGalleryItemById(state, galleryItemId))
  const displayDate = parseISO(galleryItem.date).toString().slice(0,16)

  var preview = galleryItem?.pixels?.map((pixel) => {
    let id = pixel._id
    return(
      <div 
        id={id}
        className='w-[8px] h-[8px] hover:cursor-pointer'
        style={{
          background: pixel.color, 
        }}/>
    )
  })

  return ( 
    <Link to={`create/${galleryItem.id}`}>
      <div id="gallery-item-card" className='flex flex-col rounded-lg bg-slate-50 border-2 border-b-stone-400 border-r-stone-400 border-t-stone-300 border-l-stone-300 transition ease-in-out duration-100 hover:border-b-stone-700 hover:border-r-stone-700 hover:border-t-stone-400 hover:border-l-stone-400'>
        <div id='card-info'>
          <p className='w-fit mx-auto my-2 font-semibold align-self-center'>{galleryItem.name? galleryItem.name : 'untitled'}</p>
          <p className='ml-5 my-5 '>{galleryItem.authors.length > 1? 'Authors: ' : 'Author: '} {galleryItem.authors.join(', ')}</p>
          <p className='ml-5 my-5 '>Created on: {displayDate}</p>
          <p className='ml-5 my-5 '>Pixel Count: {galleryItem.pixels.length}</p>
          <p className='ml-5 my-5 '>Collaboration: {galleryItem.collab? 'Enabled' : 'Disabled'}</p>
          <div className='w-24 h-48 -mt-48 ml-auto mr-4 mb-6 opacity-10 flex flex-wrap overflow-hidden'>
            {preview}
          </div>
        </div>
      </div>
    </Link>
  )
}

function Gallery() {
  const dispatch = useDispatch();
  const activeGalleryItem = useSelector(state => state.editor.activeGalleryItem)

  const orderedGalleryItemIds = useSelector(selectGalleryItemIds)

  const galleryStatus = useSelector(state => state.gallery.status)
  const error = useSelector(state => state.gallery.error)

  useEffect(() => {
    if(galleryStatus === 'idle'){
      dispatch(fetchGalleryItems())
    }
  },[galleryStatus, dispatch, activeGalleryItem])

  let content

  if(galleryStatus === 'idle') {
    content = (
      <div className='w-full flex justify-center'>
        <img alt='loading-spinner' className='animate-spin mx-auto' src={ loadingSpinner }/>
      </div>
    )
  } else if(galleryStatus === 'succeeded') {
    content = orderedGalleryItemIds.map(galleryItemId => (
      <GalleryItem key={galleryItemId} galleryItemId={galleryItemId} />
    ))
  } else if(galleryStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <div id='gallery-root' className= 'w-full overflow-x-hidden pb-10 flex flex-col items-center bg-primary '>
      <h1 id='header' className='pt-10 text-5xl font-bold'>Gallery</h1>
        <div id='gallery-item-container' className={galleryStatus === 'idle'? 'w-full my-20' : 'w-full md:w-1/2 my-10 px-2 grid gap-1 grid-cols-2'}>
          {content}
        </div>
    </div>
  )
}

export default Gallery;
