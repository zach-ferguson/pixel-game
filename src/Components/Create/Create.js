import React, { useEffect, useState } from 'react'
import { DebouncedPicker } from './ColorPicker';
import CreateTools from './CreateTools';
import { useDispatch, useSelector } from 'react-redux';
import { selectGalleryItemById } from '../Gallery/gallerySlice';
import { addNewPixel, deletePixel, editGalleryItemCollab, editGalleryItemTitle, fetchGalleryItem, setActiveGalleryItem, updatePixels, updateWidth } from './editorSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import editIcon from '../../Images/icons8-edit-50.png'
import Fork from './Fork';
import CollabArea from './CollabArea';

function Create() {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useAuth0();
  
  const id = params.id
  const componentGalleryItem = useSelector(state => selectGalleryItemById(state, id))
  const activeGalleryItem = useSelector(state => state.editor.activeGalleryItem)

  const [color, setColor] = useState('#000000')
  const [tool, setTool] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [showBorder, setShowBorder] = useState(true)
  const [newTitle, setNewTitle] = useState(null)
  const [editTitleMode, setEditTitleMode] = useState(false)
  const [forkPopup, setForkPopup] = useState()

  const canEdit = Boolean((activeGalleryItem?.authors?.includes(user?.name)  || activeGalleryItem.collab))
  const isAuthor = Boolean(activeGalleryItem?.authors?.includes(user?.name))

  useEffect(() => {
    if(componentGalleryItem){
      dispatch(setActiveGalleryItem( {targetGalleryItem: componentGalleryItem} ))
    } else {
      // needs reworking for visiting /:id directly, conflicting id and _id
      dispatch(fetchGalleryItem({ id }))
    }
  },[componentGalleryItem, dispatch, id])

  // perhaps run a cron like function whenever someone else is in the same gallery item editing simultaniously
  // websockets?

  const handlePixelClick = async(id) => {
    if(!canEdit) return;
    switch(tool){
      case 0:
        changePixelColor(id)
        break;
      case 1:
        changePixelColor(id, '#FFFFFF')
        break;
      case 2:
        handleGetPixelColor(id);
        break;
      case 3: 
        handleDeletePixel(id);
        break;
      default:
        break;
    }
  }
  
  const changePixelColor = async(id) => {
    try{
      await dispatch(updatePixels({ pixelId: id, newColor: selectedColor })).unwrap()
    } catch(err) {
      console.log('failed to update pixel: ', err)
    }
  }

  const handleGetPixelColor = (id) => {
    setSelectedColor(activeGalleryItem.pixels.find(pixel => pixel._id === id).color)
  }

  const addPixel = async() => {
    try{
      await dispatch(addNewPixel({empty: 'empty'})).unwrap()
    } catch(err){
      console.log('failed to add new pixel: ', err)
    }
  }

  const handleDeletePixel = async(id) => {
    try{
      await dispatch(deletePixel({ pixelId: id })).unwrap()
    } catch(err){ 
      console.error(err)
    }
  }

  const changeWidth = async(newWidth) => {
    try{
      await dispatch(updateWidth({ newWidth: newWidth})).unwrap()
    } catch (err) {
      console.log('failed to update width : ', err)
    }
  }

  const editTitle = async() => {
    try{
      await dispatch(editGalleryItemTitle({ newTitle: newTitle })).unwrap()
      setEditTitleMode(false)
    } catch(err) {
      console.log(err)
    }
  }
  
  const changeCollabSetting = async() => {
    try{
      console.log('attempting collab change')
      await dispatch(editGalleryItemCollab({ newCollabState: !activeGalleryItem.collab })).unwrap()
    } catch(err) {
      console.log(err)
    }
  }

  const openEditTitlePopover = () => {
    setEditTitleMode(true)
  }

  const changeNewTitle = (e) => {
    setNewTitle(e.target.value)
  }

  const openForkForm = () => {
    setForkPopup(true)
  }

  const closeForkForm = () => {
    setForkPopup(false)
  }

  var canvasContents
  if(activeGalleryItem?.id){
    canvasContents = activeGalleryItem?.pixels?.map((pixel) => {
      let id = pixel._id
      return(
        <div 
          className='w-[18px] h-[18px] hover:cursor-pointer'
          style={{
            background: pixel.color, 
            border: showBorder? '1px solid gray' : '', 
          }} 
            onClick={() => handlePixelClick(id)}/>
      )
    })
  } else canvasContents = <div>Please return to Gallery</div>

  return (
    <div class='min-w-full min-h-full'>
      <Fork open={forkPopup} close={closeForkForm} title={activeGalleryItem.name}/>
      <h1 id='header' class='text-5xl font-bold mx-auto max-w-fit pt-10'>Create</h1>
      <div id='pixel-game-area' className='flex flex-col items-center mx-auto mt-10'>
        <div id='gallery-item-title' style={{display: 'flex', alignItems: 'center'}}>
          <h2 class='font-bold'>{activeGalleryItem?.name}</h2>
          {canEdit && (
          <>
            <div id='edit-title'>
              <img src={editIcon} alt='edit-icon' className='w-6 h-6 ml-1 hover:cursor-pointer'
                onClick={openEditTitlePopover}></img>
            </div>
            <div id='edit-title-popover' 
              className={editTitleMode? 
                'w-80 h-12 flex absolute rounded-lg animate-fadein'
              : 'hidden animate-fadein'}>
              <input className='w-48 rounded-lg mr-1 pastel-border' type='text' onChange={changeNewTitle}/>
              <div className='flex pastel-border rounded-lg'>
                <button className='w-16 bg-green-300 rounded-l-md transition ease-in-out duration-100 hover:cursor-pointer hover:bg-green-400' onClick={() => { editTitle()}}>Save</button>
                <button className='w-16 bg-red-300 rounded-r-md transition ease-in-out duration-100 hover:cursor-pointer hover:bg-red-400' onClick={() => { setEditTitleMode(false)}}>Close</button>
              </div>  
            </div>
          </>)}
        </div>
        
        <div className='flex flex-wrap mx-auto mt-4' style={{ width: activeGalleryItem?.width * 18 }}>
          {canvasContents}
        </div>
        <DebouncedPicker color={color} onChange={setColor} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        <CollabArea isAuthor={isAuthor} canEdit={canEdit} changeCollabSetting={changeCollabSetting}/>
        <CreateTools
            tool={tool} 
            setTool={setTool} 
            showBorder={showBorder} 
            setShowBorder={setShowBorder} 
            width={activeGalleryItem?.width}
            changeWidth={changeWidth}
            addPixel={addPixel}
            canEdit={canEdit}
            openForkForm={openForkForm}/> 
      </div>
    </div>
  )
}

export default Create;
