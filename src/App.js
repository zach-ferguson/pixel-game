import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Gallery from './Pages/Gallery';
import Create from './Pages/Create';
import { makeStyles } from '@mui/styles';
import SideMenu from './Components/SideMenu';

const useStyles = makeStyles(() => ({
  root:{    
    minHeight: '100vh',
    minWidth: '100vh',
    background: '#D3BDB0',
  },
}))

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <SideMenu className={classes.sideMenu}/>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
