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
import Calculator531 from './Destinations/531/Layouts/Calculator531';

function App() {
  
  return (
    <div className='w-screen h-screen bg-primary'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="create" element={<CreateNew />} />
          <Route path="create/:id" element={<Create /> } />
          <Route path="531" element={<Calculator531 /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
