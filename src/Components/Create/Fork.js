import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchGalleryItems } from '../Gallery/gallerySlice'
import { forkActiveGalleryItem } from './editorSlice'

export default function Fork({ open, close, title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  const [name, setName] = useState('untitled')
  const [collabEnabled, setCollabEnabled] = useState(false)
  const changeName = (e) => setName(e.target.value)
  const changeCollabEnabled = (e) => setCollabEnabled(e.target.checked)

  const fork = async() => {
    try{
      await dispatch(forkActiveGalleryItem({ 
        name: name,
        author: user.name,
        collab: collabEnabled,
      })).unwrap()
      dispatch(fetchGalleryItems())
      navigate('/')
    } catch(err){
      console.log(err);
    }
  }

    return (
      <div className={open? 'absolute flex items-center justify-center w-full h-full bg-[rgba(100,100,100,.8)] z-10' : 'hidden'}>
        <div className='w-[400px] h-[300px] bg-slate-50 rounded-lg p-5 pastel-border'>
          <form>
            <div id='form-content' className='m-2'>
              <p className='w-full text-lg mb-6' >
                Forking '{title}' ...
              </p>
              <lable for='name'>Title: </lable>
              <input type='text' id='name' name='name' onChange={changeName} className='w-[90%] border border-black rounded-lg mx-3 indent-2'></input>
              <br></br>
              <br></br>
              <label for='colab-switch' >Allow collaboration with other users</label>
              <input type='checkbox' id='colab-switch' name='collab-switch' className='ml-5 mb-10' onChange={changeCollabEnabled}></input>
              <br></br>
            </div>
          </form>
          <div className='flex justify-around'>
            <button className='w-1/3 h-10 mb-5 mx-auto rounded-lg pastel-border bg-rose-300 transition duration-100 ease-in-out hover:opacity-80' onClick={() => {close()}}>Close</button>
            <button 
              className={isAuthenticated? 
                'w-1/3 h-10 mb-5 mx-auto ml-3 rounded-lg pastel-border bg-tertiary transition duration-100 ease-in-out hover:opacity-80' 
              : 'w-1/3 h-10 mb-5 mx-auto ml-3 rounded-lg pastel-border bg-tertiary opacity-50'}
              onClick={() => {fork()}}
              disabled={!isAuthenticated}>
                Save
              </button>  
          </div>
        </div>
      </div>
  )
}

