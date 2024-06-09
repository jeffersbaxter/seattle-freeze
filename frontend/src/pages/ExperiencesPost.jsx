// projfreeze/frontend/src/pages/Experiences.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const ExperiencesPost = () => {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', price: '', minBirthdate: '', locationId: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "locations";
            const response = await axios.get(URL);
            const _locations = [{locationId: "NULL", address: "Null"}, ...response.data.map(location => ({locationId: location.locationId, address: `${location.addressNumber} ${location.streetName}, ${location.city}, ${location.state}, ${location.zipCode}`}))]
            setLocations(_locations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancelClick = () => {
        navigate("/experiences");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + 'experiences';

        try {
            const response = await axios.post(url, formData);

            navigate("/experiences");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Experiences | Create</h1>
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
            <div className="add-experience-form">
                <h2>Create an Experience</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Date:
                        <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Price:
                        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Min Birthdate:
                        <input type="date" name="minBirthdate" value={formData.minBirthdate} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Location:
                        <select name="locationId" value={formData.locationId} onChange={handleInputChange}>
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.locationId} value={location.locationId}>
                                    {`${location.address}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ExperiencesPost;
