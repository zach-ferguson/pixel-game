import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/"/>
      <Route path="create"/>
      <Route path="create/:id"/>
      <Route />
    </Routes>
  </BrowserRouter>
);