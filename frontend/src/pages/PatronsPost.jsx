
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css';

const PatronsPost = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', birthdate: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + 'patrons';

        try {
            const response = await axios.post(url, formData);

            navigate("/patrons");
        } catch (error) {
            console.error('Error creating a Patron:', error);
        }
    };

    const handleCancelClick = () => {
        navigate("/patrons");
    };
    
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="add-patron-form">
                <h2>Create a Patron</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        First Name:
                    </label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Last Name:
                    </label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Email:
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Birthdate:
                    </label>
                    <input type="date" name="birthdate" value={formData.birthdate.substring(0, 10)} onChange={handleInputChange} max={today} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default PatronsPost;