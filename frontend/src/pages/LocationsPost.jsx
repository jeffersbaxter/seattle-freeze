
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css';

const LocationsPost = () => {
    const [formData, setFormData] = useState({ addressNumber: '', streetName: '', unitNumber: '', city: '', state: '', zipCode: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + 'locations';

        try {
            const response = await axios.post(url, formData);

            navigate("/locations");
        } catch (error) {
            console.error('Error creating a Location:', error);
        }
    };

    const handleCancelClick = () => {
        navigate("/locations");
    };

    return (
        <>
            <header>
                <h1>Locations | Create</h1>
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
            <div className="add-location-form">
                <h2>Create a Location</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Address Number:
                        <input type="text" required name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Street Name:
                        <input type="text" required name="streetName" value={formData.streetName} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Unit Number:
                        <input type="text" name="unitNumber" value={formData.unitNumber} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        City:
                        <input type="text" required name="city" value={formData.city} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        State:
                        <input type="text" required name="state" value={formData.state} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Zip Code:
                        <input type="text" required name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </label>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default LocationsPost;