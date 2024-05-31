// projfreeze/frontend/src/pages/Locations.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [editLocationId, setEditLocationId] = useState(null);
    const [formData, setFormData] = useState({ addressNumber: '', streetName: '', unitNumber: '', city: '', state: '', zipCode: '' });
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        setShowAddLocation(true);
        setEditLocationId(null);
        setFormData({ addressNumber: '', streetName: '', unitNumber: '', city: '', state: '', zipCode: '' });
    };

    const handleCancelClick = () => {
        setShowAddLocation(false);
        setEditLocationId(null);
        setFormData({ addressNumber: '', streetName: '', unitNumber: '', city: '', state: '', zipCode: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editLocationId ? `${import.meta.env.VITE_API_URL}locations/${editLocationId}` : import.meta.env.VITE_API_URL + 'locations';
        const method = editLocationId ? 'PUT' : 'POST';

        try {
            if (method === "POST") {
                const response = await axios.post(url, formData);
            } else {
                const EDIT_URL = `${import.meta.env.VITE_APT_URL}locations/${editLocationId}`; 
                const response = await axios.put(EDIT_URL, formData);
            }
            fetchLocations();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (location) => {
        setEditLocationId(location.locationId);
        setFormData({ addressNumber: location.addressNumber, streetName: location.streetName, unitNumber: location.unitNumber, city: location.city, state: location.state, zipCode: location.zipCode });
        setShowAddLocation(true);
    };

    const handleDeleteClick = async (locationId) => {
        try {
            // TODO: DELETE Location by ID
            // await fetch(`${import.meta.env.VITE_API_URL}${locationId}`, { method: 'DELETE' });
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
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/roleCategories">Role Categories</Link></li>
                </ul>
            </nav>
            {showAddLocation ? (
                <div className="add-location-form">
                    <h2>{editLocationId ? 'Edit Location' : 'Add Location'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Address Number:
                            <input type="text" name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Street Name:
                            <input type="text" name="streetName" value={formData.streetName} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Unit Number:
                            <input type="text" name="unitNumber" value={formData.unitNumber} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            City:
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            State:
                            <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Zip Code:
                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                        </label>
                        <br />
                        <button type="submit">{editLocationId ? 'Update Location' : 'Add Location'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default Locations;
