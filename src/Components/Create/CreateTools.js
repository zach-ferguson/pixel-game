import React from 'react'
import dropperIcon from '../../Images/icons8-color-dropper-64.png';
import borderIcon from '../../Images/icons8-sewing-patch-64.png';
import plusIcon from '../../Images/icons8-plus-+-64.png'
import plusIcon2 from '../../Images/icons8-plus-+2-64.png'
import minusIcon from '../../Images/icons8-minus-64.png'
import deleteIcon from '../../Images/icons8-cancel-64.png'
import editIcon from '../../Images/icons8-edit-50.png'
import eraseIcon from '../../Images/icons8-erase-50.png'
import forkIcon from '../../Images/icons8-fork-64.png'
import { useSelector } from 'react-redux';

const iconStyle = `w-12 h-12 m-2 hover:cursor-pointer hover:opacity-50`
const selectedIconStyle = `w-12 h-12 m-2 border border-black rounded-lg`

function CreateTools(props) {
    const currentWidth = useSelector(state => state.editor.activeGalleryItem?.width)

    return (
        <div className='w-full h-[12%] fixed bottom-0 bg-secondary border-t border-t-black'>
          <div className='flex justify-center mx-auto my-1'>
            {props.canEdit && (
              <>
            <div className='flex flex-col flex-wrap items-center'> 
              <span>Tools</span> 
              <div className='flex'>
                <img className={props.tool === 0? selectedIconStyle : iconStyle} alt='edit' src={ editIcon } onClick={() => { props.setTool(0) }}/>
                <img className={props.tool === 1? selectedIconStyle : iconStyle} alt='erase' src={ eraseIcon } onClick={() => { props.setTool(1) }}/>
                <img className={props.tool === 2? selectedIconStyle : iconStyle} alt='dropper' src={ dropperIcon } onClick={() => { props.setTool(2) }}/>
              </div>
            </div>
            <div id='divider' className='w-px h-16 mx-1 my-auto bg-black' />
            <div className='flex flex-col flex-wrap items-center'>
              <span>Pixels</span>
              <div className='flex'>
                <img className={iconStyle} src={plusIcon2} alt='add-pixel' onClick={() => { props.addPixel() }}/>
                <img className={props.tool === 3? selectedIconStyle : iconStyle} alt='remove-pixel' src={ deleteIcon } onClick={() => { props.setTool(3) }}/>
                </div>
            </div>
            <div id='divider' className='w-px h-16 mx-1 my-auto bg-black' />
            <div className='flex flex-col flex-wrap items-center'>
              <span>Width</span>
              <div className='flex'>
                <img className={iconStyle} src={ plusIcon } alt='add-pixel' onClick={() => { props.changeWidth(currentWidth + 1) }}/>
                <img className={iconStyle} src={ minusIcon } alt='remove-pixel' onClick={() => { props.changeWidth(currentWidth - 1) }}/>
              </div>
            </div>
            <div id='divider' className='w-px h-16 mx-1 my-auto bg-black' />
            </>
            )}
            <div className='flex flex-col flex-wrap items-center'>
              <span>Utilities</span>
              <div className='flex'>
                <img className={iconStyle} src={ borderIcon } alt='border' onClick={() => { props.setShowBorder( !props.showBorder ); }}/>
                {props.canEdit && (<img className={iconStyle} src={ forkIcon } alt='fork' onClick={() => { props.openForkForm(); }}/>)}
              </div>
            </div>
          </div>
          <span className='text-xs fixed bottom-0 right-0 text-primary'>
            Icons gratefully sourced from <a href={'https://icons8.com/'}>https://icons8.com/</a>
          </span>
        </div>
    )
}

export default CreateTools
