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

    const todaysdate = new Date().toISOString().slice(0, 16);
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container">
            <div className="add-experience-form">
                <h2>Create an Experience</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Title:
                    </label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Description:
                    </label>
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Date:
                    </label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} min={todaysdate} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Price:
                    </label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Min Birthdate:
                    </label>
                    <input type="date" name="minBirthdate" value={formData.minBirthdate} onChange={handleInputChange} max={today} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Location:
                    </label>
                    <select name="locationId" value={formData.locationId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Location</option>
                        {locations.map(location => (
                            <option key={location.locationId} value={location.locationId}>
                                {`${location.address}`}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ExperiencesPost;
