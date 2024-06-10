// projfreeze/frontend/src/pages/Experiences.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const ExperiencesEdit = ({ experience }) => {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({ 
        title: experience.title, 
        description: experience.description, 
        date: (experience.date ? experience.date.substring(0, 16) : ""), 
        price: (experience.price ? experience.price : ""), 
        minBirthdate: (!!experience.minBirthdate ? experience.minBirthdate.substring(0, 10) : ""), 
        locationId: experience.locationId !== null ? experience.locationId : ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

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
        const url = `${import.meta.env.VITE_API_URL}experiences/${id}`;

        try {
            const response = await axios.put(url, formData);

            navigate("/experiences");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container">
            <header>
                <h1>Experiences | Edit</h1>
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
                <h2>Edit an Experience</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    </label>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    </label>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Date:
                        <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    </label>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Price:
                        <input type="text" name="price" value={formData.price} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    </label>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Min Birthdate:
                        <input type="date" name="minBirthdate" value={formData.minBirthdate} onChange={handleInputChange} max={today} style={{ border: '1.5px solid black'}}/>
                    </label>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Location:
                        <select name="locationId" value={formData.locationId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.locationId} value={location.locationId}>
                                    {`${location.address}`}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ExperiencesEdit;
