// App.jsx
import React from 'react';
import ListVenues from './listVenues'; // Import ListVenues component

function App() {
  return (
    <div className="App">
      <h1>Venues List</h1>
      <ListVenues /> {/* Render ListVenues component */}
    </div>
  );
}

export default App;
