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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {venues.map(venue => (
                        <tr key={venue.id}>
                            <td><Link to={`/venues/${venue.id}`}>{venue.name}</Link></td>
                            <td>{venue.address}</td>
                            <td><img src={venue.img} alt={venue.name} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListVenues;