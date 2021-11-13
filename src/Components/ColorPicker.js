import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { HexColorPicker } from "react-colorful";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        marginTop: '20px'
    },
    colorDisplay: {
        width: '200px',
        height: '200px',
        borderRadius: '10px',
    }
}))

export const DebouncedPicker = ({ color, onChange, selectedColor, setSelectedColor }) => {
  const classes = useStyles();
  const [value, setValue] = useState(color);

  useDebounce(() => onChange(value), 200, [value]);

  useEffect(() => {
    setSelectedColor(value)
  },[value])

  return (
    <div className={classes.root}>
        <HexColorPicker color={value} onChange={setValue} />
        <div className={classes.colorDisplay} style={{ backgroundColor: selectedColor }}/>
    </div>
  )
};
