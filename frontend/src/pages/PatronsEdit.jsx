
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

    return (
        <>
            <header>
                <h1>Patrons | Edit</h1>
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
                <h2>Edit a Patron</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={patron.firstName} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={patron.lastName} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={patron.email} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Birthdate:
                        <input type="date" name="birthdate" value={patron.birthdate.substring(0, 10)} onChange={handleInputChange} />
                    </label>
                    <br />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default PatronsEdit;