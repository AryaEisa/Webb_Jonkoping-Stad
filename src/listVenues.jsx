import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './venueStyle.css';

const ListVenues = () => {
    
    const [venues, setVenues] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('Alla');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [districts, setDistricts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getVenues = async () => {
        try {
            const response = await fetch("http://localhost:3000/venues");
            const jsonData = await response.json();
            setVenues(jsonData);

            // Extract unique districts from venues
            const uniqueDistricts = [...new Set(jsonData.map(venue => venue.district))];
            setDistricts(uniqueDistricts);

            // Extract unique categories from venues
            const uniqueCategories = [...new Set(jsonData.map(venue => venue.category))];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    useEffect(() => {
        getVenues();
    }, []); 

    // Filter venues based on selected district and category
    const filteredVenues = venues.filter(venue =>
        (selectedDistrict === 'Alla' || venue.district === selectedDistrict) &&
        (selectedCategory === 'All Categories' || venue.category === selectedCategory)
    );

    return (
        
        <div className="venues-container">
              <div className="mapImage">
            <img 
    alt="Karta över stadskärnan" 
    src="https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png" 
    srcSet="https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 640w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 750w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 828w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 1080w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 1200w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 1920w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 2048w,
            https://cdn.gracestudio.io/jkpg-city/Karta_stadskaernan_9946c1b091/Karta_stadskaernan_9946c1b091.png 3840w"
    sizes="150vw, 290vw"
    
    
  />
            </div>
            <h1>Venues List</h1>
            
      <video 
        autoPlay 
        playsInline 
        loop 
        muted // It's important to mute the video for autoplay to work in most browsers
        preload="auto" // Change to 'auto' or 'metadata' depending on your preference
        className="background-video"
      >
        <source src="https://cdn.gracestudio.io/jkpg-city/Header_16_9_03_78b04b7dbf/Header_16_9_03_78b04b7dbf.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    

            
            <div className="filter-dropdown">
                <label htmlFor="districtSelect" className="filter-label">Filter by District: </label>
                <select id="districtSelect" className="filter-select" value={selectedDistrict} onChange={handleDistrictChange}>
      <option value="Alla">Alla</option>
      {districts.map((district, index) => (
        <option key={index} value={district}>{district}</option>
      ))}
    </select>
  </div>
  <div className="filter-section">
  <div className="filter-dropdown">
    <label htmlFor="districtSelect" className="filter-label">Filter by District:</label>
    <select id="categorySelect" className="filter-select" value={selectedCategory} onChange={handleCategoryChange}>
      <option value="All Categories">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
            </div>
            </div>
            <div className="venue-cards">
                
                {filteredVenues.map((venue) => (
                    <div key={venue.id} className="venue-card">
                        <img className="venue-img" src={venue.img} alt={venue.name} />
                        <div className="venue-details">
                            <h2>{venue.name}</h2>
                            <p>{venue.district}</p>
                            <p>{venue.address}</p>
                            <p>{venue.category}</p>
                            <Link className="btn btn-info" to={`/venues/${venue.id}`}>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListVenues;
