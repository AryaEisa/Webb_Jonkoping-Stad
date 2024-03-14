import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListVenues from './listVenues';
import ListVenuesDetail from './listVenueDetails';
import Login from './Login';
import Navbar from './header';
import Admin from './admin';
import Register from './register';
import { AuthProvider } from './AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListVenues />} />
          <Route path="/login" element={<Login />} />
          <Route path="/venues" element={<ListVenues />} />
          <Route path="/venues/:id" element={<ListVenuesDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
