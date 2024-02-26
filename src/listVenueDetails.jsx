import React, { useEffect, useState } from "react";
import './venueStyle.css'

const ListVenuesDetail = ({ match }) => {
    
    const [venue, setVenue] = useState(null);
    const { id } = match.params;

    const getVenueById = async () => {
        try {
            const response = await fetch(`http://localhost:3000/venues/${id}`);
            const jsonData = await response.json();
            setVenue(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getVenueById();
    }, [id]); 

    if (!venue) {
        return <div>Loading...</div>;
    }

    return (
        <div className="venues-container">
            <h2>{venue.name}</h2>
            <p>Address: {venue.address}</p>
            <img src={venue.img} alt={venue.name} />
        </div>
    );
}

export default ListVenuesDetail;