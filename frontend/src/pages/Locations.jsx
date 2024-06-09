// projfreeze/frontend/src/pages/Locations.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Locations = ({ onEditLocation }) => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "locations";
            const response = await axios.get(URL);

            setLocations(response.data);
            setFilteredLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = locations.filter(location =>
                location.streetName.toLowerCase().includes(query.toLowerCase()) ||
                location.city.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(locations);
        }
    };

    const handleNewLocationClick = () => {
        navigate("/locations/create");
    };

    const handleEditClick = (location) => {
        onEditLocation(location);

        navigate(`/locations/edit/${location.locationId}`);
    };

    const handleDeleteClick = async (locationId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}locations/${locationId}`;
            const response = await axios.delete(DELETE_URL);
            fetchLocations();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Locations</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/patrons">Patrons</Link></li>
                    <li><Link to="/experiences">Experiences</Link></li>
                    <li><Link to="/paidExperiences">Paid Experiences</Link></li>
                    <li><Link to="/locations">Locations</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/roleCategories">Role Categories</Link></li>
                </ul>
            </nav>
            <button onClick={handleNewLocationClick}>New Location</button>
                <div className="search-box">
                    <label htmlFor="search">Search by Street Name or City:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Enter street name or city"
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Location ID</th>
                            <th>Address Number</th>
                            <th>Street Name</th>
                            <th>Unit Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLocations.map((location) => (
                            <tr key={location.locationId}>
                                <td><button onClick={() => handleEditClick(location)}>Edit</button></td>
                                <td><button onClick={() => handleDeleteClick(location.locationId)}>Delete</button></td>
                                <td>{location.locationId}</td>
                                <td>{location.addressNumber}</td>
                                <td>{location.streetName}</td>
                                <td>{location.unitNumber}</td>
                                <td>{location.city}</td>
                                <td>{location.state}</td>
                                <td>{location.zipCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default Locations;
