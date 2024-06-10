
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
            <div className="add-location-form">
                <h2>Create a Location</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Address Number:
                    </label>
                    <input type="text" required name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Street Name:
                    </label>
                    <input type="text" required name="streetName" value={formData.streetName} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Unit Number:
                    </label>
                    <input type="text" name="unitNumber" value={formData.unitNumber} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        City:
                    </label>
                    <input type="text" required name="city" value={formData.city} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        State:
                    </label>
                    <input type="text" required name="state" value={formData.state} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Zip Code:
                    </label>
                    <input type="text" required name="zipCode" value={formData.zipCode} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default LocationsPost;