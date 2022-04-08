import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Gallery from './Components/Gallery/Gallery';
import Create from './Components/Create/Create';
import CreateNew from './Components/Create/CreateNew';
import Navbar from './Components/Nav/Navbar';

function App() {
  
  return (
    <div className='w-screen h-screen bg-primary overflow-hidden'>
      <BrowserRouter>
        <Navbar />
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
