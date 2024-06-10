import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const LocationsEdit = ({ location }) => {
    const [formData, setFormData] = useState(location);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancelClick = () => {
        navigate("/locations");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API_URL}locations/${id}`;

        try {
            const response = await axios.put(url, formData);

            navigate("/locations");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <div className="add-location-form">
                <h2>Edit Location</h2>
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
                    <input type="text" name="unitNumber" value={formData.unitNumber || ""} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
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
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default LocationsEdit;
