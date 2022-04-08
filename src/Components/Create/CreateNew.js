import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchGalleryItems } from '../Gallery/gallerySlice'
import { createNewGalleryItem } from './editorSlice'

function CreateNew() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [name, setName] = useState('untitled')
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20)
  const [collabEnabled, setCollabEnabled] = useState(false)

  const changeName = (e) => setName(e.target.value)
  const changeWidth = (e) => setWidth(parseInt(e.target.value))
  const changeHeight = (e) => setHeight(parseInt(e.target.value))
  const changeCollabEnabled = (e) => setCollabEnabled(e.target.checked)

  const createNew = async() => {
    try {
      console.log(name, width, height, user.name, collabEnabled )
      await dispatch(createNewGalleryItem({
        itemName: name,
        width: width,
        height: height, 
        author: user.name,
        collabEnabled: collabEnabled,
      })).unwrap()
      dispatch(fetchGalleryItems())
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <h1 id='header' className='pt-10 text-5xl font-bold mb-16'>Create New</h1>
      <div className='w-96 h-fit bg-slate-50 rounded-lg p-5 pastel-border'>
        <form>
          <div id='form-content' className='w-full m-1'>
            <lable for='name'>Name</lable>
            <input className='w-[90%] border border-black rounded-lg mx-3 indent-2' type='text' id='name' name='name' onChange={changeName}></input>
            <br></br>
            <br></br>
            <label for="vol">Width <p className='text-xs'>(between 1 and 20):</p></label>
            <input className='w-full' type="range" id="width" name="width" min="1" max="20" onChange={changeWidth}></input>
            <p className='w-full ml-auto font-semibold -mr-[45%]'>{width}</p>
            <br></br>
            <label for="vol">Height <p className='text-xs'>(between 1 and 20):</p></label>
            <input className='w-full' type="range" id="height" name="height" min="1" max="20" onChange={changeHeight}></input>
            <p className='w-full ml-auto font-semibold -mr-[45%]'>{height}</p>
            <br></br>
            <br></br>
            <label for='colab-switch'>Allow other users to collaborate</label>
            <input className='mx-6' type='checkbox' id='colab-switch' name='collab-switch' onChange={changeCollabEnabled}></input>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </form>
        <div className='w-full h-full'> 
          {!isAuthenticated && (<p className='my-2'>Please log in to create a new gallery item.</p>)}
          <button 
            className={isAuthenticated? 
              'w-full h-10 mb-5 mx-auto rounded-lg pastel-border bg-tertiary transition duration-100 ease-in-out hover:opacity-80' 
            : 'w-full h-10 mb-5 mx-auto rounded-lg pastel-border bg-tertiary opacity-50'}
            onClick={() => createNew()} 
            disabled={!isAuthenticated}>
              Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateNew