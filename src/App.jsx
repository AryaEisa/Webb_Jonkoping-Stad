import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListVenues from './listVenues';
import ListVenuesDetail from './listVenueDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListVenues />} />
        <Route path="/venues" element={<ListVenues />} />
        <Route path="/venues/:id" element={<ListVenuesDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
