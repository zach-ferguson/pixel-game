import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { HexColorPicker } from "react-colorful";
import coolorsIcon from '../../Images/coolors-logo.png'

export const DebouncedPicker = ({ color, onChange, selectedColor, setSelectedColor }) => {
  const [value, setValue] = useState(color);

  useDebounce(() => onChange(value), 500, [value]);

  useEffect(() => {
    setSelectedColor(value)
  },[setSelectedColor, value])

  return (
    <div className='flex flex-col mt-10'>
      <div className='w-[410px] h-fit flex justify-between'>
        <HexColorPicker className='custom-layout' color={value} onChange={setValue} />
        <div className='flex flex-col items-center -mt-[6px]'>
          <div id='selected-color' className='flex w-24 h-[18px]'>
            <p className='w-32'>{selectedColor}</p>
            <a className='w-10 h-6 ml-auto justify-self-end transition duration-100 ease-in-out hover:cursor-pointer hover:opacity-50' href={'https://coolors.co/' + selectedColor.slice(1,7)} target='_blank' rel="noreferrer">
              <img className='w-full h-full ' alt='coolors-icon' src={coolorsIcon}/>
            </a>
          </div>
          <div className='w-[198px] h-[159px] mt-[14px] rounded-md border border-black' style={{ backgroundColor: selectedColor }}/>
        </div>
      </div>
    </div>
  )
};
