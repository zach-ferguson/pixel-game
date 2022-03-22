import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Gallery from './Components/Gallery/Gallery';
import Create from './Components/Create/Create';
import { makeStyles } from '@mui/styles';
import SideMenu from './Components/SideMenu';
import CreateNew from './Components/Create/CreateNew';

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
    <div className='w-screen h-screen bg-primary'>
      <BrowserRouter>
        <SideMenu className={classes.sideMenu}/>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="create" element={<CreateNew />} />
          <Route path="create/:id" element={<Create /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
