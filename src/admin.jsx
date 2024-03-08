import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminStyle.css'; // Import CSS file for styling

const Admin = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({
    name: '',
    url: '',
    district: '',
    category: '',
    address: '',
    img: ''
  });
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    getVenues();
  }, []);

  const getVenues = async () => {
    try {
      const response = await axios.get('http://localhost:3000/venues');
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVenue({ ...newVenue, [name]: value });
  };

  const handleAddVenue = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/venues', newVenue);
      setNewVenue({
        name: '',
        url: '',
        district: '',
        category: '',
        address: '',
        img: ''
      });
      getVenues();
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/venues/${id}`);
      getVenues();
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const handleModifyVenue = (venue) => {
    setSelectedVenue(venue);
  };

  const handleModifySubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/venues/${selectedVenue.id}`, selectedVenue);
      setSelectedVenue(null);
      getVenues();
    } catch (error) {
      console.error('Error modifying venue:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <div className="add-venue-form">
        <h2>Add New Venue</h2>
        <form onSubmit={handleAddVenue}>
          {/* Input fields for new venue */}
          <input type="text" name="name" value={newVenue.name} onChange={handleInputChange} placeholder="Name" />
          <input type="text" name="url" value={newVenue.url} onChange={handleInputChange} placeholder="URL" />
          <input type="text" name="district" value={newVenue.district} onChange={handleInputChange} placeholder="District" />
          <input type="text" name="category" value={newVenue.category} onChange={handleInputChange} placeholder="Category" />
          <input type="text" name="address" value={newVenue.address} onChange={handleInputChange} placeholder="Address" />
          <input type="text" name="img" value={newVenue.img} onChange={handleInputChange} placeholder="Image URL" />
          <button type="submit">Add Venue</button>
        </form>
      </div>
      <h2>Venues</h2>
      <div className="venue-list-container">
        <div className="venue-list">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img className="venue-img" src={venue.img} alt={venue.name} />
              <div className="venue-details">
                {/* Make sure the venue name is visible */}
                <h2>{venue.name}</h2>
                <p>{venue.district}</p>
                <p>{venue.address}</p>
                <p>{venue.category}</p>
                <button onClick={() => handleModifyVenue(venue)}>Modify</button>
                <button onClick={() => handleDeleteVenue(venue.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal or form for modifying venue */}
      {selectedVenue && (
        <div className="modify-modal">
          <h2>Modify Venue</h2>
          <form onSubmit={handleModifySubmit}>
            {/* Input fields for modifying venue */}
            <input type="text" name="name" value={selectedVenue.name} onChange={(e) => setSelectedVenue({ ...selectedVenue, name: e.target.value })} placeholder="Name" />
            <input type="text" name="url" value={selectedVenue.url} onChange={(e) => setSelectedVenue({ ...selectedVenue, url: e.target.value })} placeholder="URL" />
            <input type="text" name="district" value={selectedVenue.district} onChange={(e) => setSelectedVenue({ ...selectedVenue, district: e.target.value })} placeholder="District" />
            <input type="text" name="category" value={selectedVenue.category} onChange={(e) => setSelectedVenue({ ...selectedVenue, category: e.target.value })} placeholder="Category" />
            <input type="text" name="address" value={selectedVenue.address} onChange={(e) => setSelectedVenue({ ...selectedVenue, address: e.target.value })} placeholder="Address" />
            <input type="text" name="img" value={selectedVenue.img} onChange={(e) => setSelectedVenue({ ...selectedVenue, img: e.target.value })} placeholder="Image URL" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
