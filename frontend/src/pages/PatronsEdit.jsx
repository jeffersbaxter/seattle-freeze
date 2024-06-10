
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../style.css';

const PatronsEdit = ({ patronToEdit }) => {
    const [patron, setPatron] = useState(patronToEdit);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatron({ ...patron, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_API_URL}patrons/${id}`;
            const response = await axios.put(url, patron);
            navigate("/patrons");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancelClick = () => {
        navigate("/patrons");
    };

    const today = new Date().toISOString().split('T')[0];
    
    return (
        <>
            <div className="add-patron-form">
                <h2>Edit a Patron</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        First Name:
                    </label>
                    <input type="text" name="firstName" value={patron.firstName} onChange={handleInputChange} style={{ border: '1.5px solid black'}} />
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Last Name:
                    </label>
                    <input type="text" name="lastName" value={patron.lastName} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Email:
                    </label>
                    <input type="email" name="email" value={patron.email} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Birthdate:
                    </label>
                    <input type="date" name="birthdate" value={patron.birthdate.substring(0, 10)} onChange={handleInputChange} max={today} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default PatronsEdit;