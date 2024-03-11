import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import ListVenues from './listVenues';
import ListVenuesDetail from './listVenueDetails';
import Login from './Login';
import Navbar from './header';
import Admin from './admin'; // Import the Admin component
import Register from './register'; // Import the Register component
import { AuthProvider } from './AuthContext'; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ListVenues />} />
          <Route path="/login" element={<Login />} />
          <Route path="/venues" element={<ListVenues />} />
          <Route path="/venues/:id" element={<ListVenuesDetail />} />
          <Route path="/admin" element={<Admin />} /> {/* Add the route for Admin component */}
          <Route path="/register" element={<Register />} /> {/* Add the route for Register component */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
