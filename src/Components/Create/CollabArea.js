import React from 'react'
import { useSelector } from 'react-redux'
import noCrowdIcon from '../../Images/icons8-avoid-crowd-64.png'
import crowdIcon from '../../Images/icons8-crowd-64.png'

function CollabArea({ isAuthor, changeCollabSetting }) {
  const activeGalleryItem = useSelector(state => state.editor.activeGalleryItem)

  return (
    <div id='collab-area'>
      {activeGalleryItem?.authors && <p className='ml-5 my-5 '>{activeGalleryItem?.authors?.length > 1? 'Authors: ' : 'Author: '} {activeGalleryItem?.authors?.join(', ')}</p>}
      {!activeGalleryItem.collab && 
        <div className='flex items-center my-5'>
          <h4>Collaboration disabled</h4>
          <button id='collab-icon-box' 
            className={!isAuthor? 
              'w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-4 border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600 cursor-default'
            : 'w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-4 border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600 transition duration-100 ease-in-out hover:opacity-60 hover:cursor-pointer'}
            disabled={!isAuthor} onClick={() => {changeCollabSetting()}}>
            <img className='w-10 h-10' alt='collab-disabled' src={ noCrowdIcon }/>
          </button>
        </div>}
      {activeGalleryItem.collab && 
        <div className='flex items-center my-5'>
          <h4>Collaboration enabled</h4>
          <button id='collab-icon-box'
            className={!isAuthor? 
              'w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-4 border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600 cursor-default'
            : 'w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-4 border-2 border-b-zinc-900 border-r-zinc-900 border-t-zinc-600 border-l-zinc-600 transition duration-100 ease-in-out hover:opacity-60 hover:cursor-pointer'}
            disabled={!isAuthor} onClick={() => {changeCollabSetting()}}>
            <img className='w-10 h-10' alt='collab-disabled' src={ crowdIcon }/>
          </button>
        </div>
      }
    </div>
  )
}

export default CollabArea