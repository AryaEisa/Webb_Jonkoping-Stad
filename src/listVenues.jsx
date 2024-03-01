import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './venueStyle.css'

const ListVenues = () => {
    
    const [venues, setVenues] = useState([]);

    const getVenues = async () => {
        try {
            const response = await fetch("http://localhost:3000/venues");
            const jsonData = await response.json();
            setVenues(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getVenues();
    }, []); 

    return (
        <div className="venues-container">
            <h1>Venues List</h1>
            <div className="venue-cards">
                {venues.map((venue) => (
                    <div key={venue.id} className="venue-card">
                        <img className="venue-img" src={venue.img} alt={venue.name} />
                        <div className="venue-details">
                            <h2>{venue.name}</h2>
                            <p>{venue.district}</p>
                            <p>{venue.address}</p>
                            <Link className="btn btn-info" to={`/venues/${venue.id}`}>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListVenues;
