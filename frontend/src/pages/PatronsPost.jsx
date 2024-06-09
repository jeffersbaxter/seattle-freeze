
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
        const navigate = useNavigate();
        navigate("/patrons");
    };

    return (
        <>
            <header>
                <h1>Patrons | Create</h1>
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
            <div className="add-patron-form">
                <h2>Create a Patron</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Birthdate:
                        <input type="date" name="birthdate" value={formData.birthdate.substring(0, 10)} onChange={handleInputChange} />
                    </label>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default PatronsPost;