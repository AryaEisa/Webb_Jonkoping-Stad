import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import ListVenues from './listVenues';
import ListVenuesDetail from './listVenueDetails';
import Login from './Login';
import Navbar from './header';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ListVenues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/venues" element={<ListVenues />} />
        <Route path="/venues/:id" element={<ListVenuesDetail />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;


