// projfreeze/frontend/src/pages/Patrons.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Patrons = () => {
    const [patrons, setPatrons] = useState([]);
    const [filteredPatrons, setFilteredPatrons] = useState([]);
    const [showAddPatron, setShowAddPatron] = useState(false);
    const [editPatronId, setEditPatronId] = useState(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', birthdate: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPatrons();
    }, []);

    const fetchPatrons = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "patrons";
            const response = await axios.get(URL);

            setPatrons(response.data);
            setFilteredPatrons(response.data);
        } catch (error) {
            console.error('Error fetching patrons:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = patrons.filter(patron =>
                patron.firstName.toLowerCase().includes(query.toLowerCase()) ||
                patron.lastName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPatrons(filtered);
        } else {
            setFilteredPatrons(patrons);
        }
    };

    const handleNewPatronClick = () => {
        setShowAddPatron(true);
        setEditPatronId(null);
        setFormData({ firstName: '', lastName: '', email: '', birthdate: '' });
    };

    const handleCancelClick = () => {
        setShowAddPatron(false);
        setEditPatronId(null);
        setFormData({ firstName: '', lastName: '', email: '', birthdate: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editPatronId ? `${import.meta.env.VITE_API_URL}patrons/${editPatronId}` : import.meta.env.VITE_API_URL + 'patrons';
        const method = editPatronId ? 'PUT' : 'POST';

        try {
            // TODO: CREATE/EDIT Patrons
            // await fetch(url, {
            //     method,
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });
            fetchPatrons();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (patron) => {
        setEditPatronId(patron.patronId);
        setFormData({ firstName: patron.firstName, lastName: patron.lastName, email: patron.email, birthdate: patron.birthdate });
        setShowAddPatron(true);
    };

    const handleDeleteClick = async (patronId) => {
        try {
            // TODO: DELETE Patron
            // await fetch(`${import.meta.env.VITE_API_URL}patrons/${patronId}`, { method: 'DELETE' });
            fetchPatrons();
        } catch (error) {
            console.error('Error deleting patron:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Patrons</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/experiences">Experiences</Link></li>
                    <li><Link to="/paidExperiences">Paid Experiences</Link></li>
                    <li><Link to="/locations">Locations</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/roleCategories">Role Categories</Link></li>
                </ul>
            </nav>
            {showAddPatron ? (
                <div className="add-patron-form">
                    <h2>{editPatronId ? 'Edit Patron' : 'Add Patron'}</h2>
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
                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                        </label>
                        <br />
                        <button type="submit">{editPatronId ? 'Update Patron' : 'Add Patron'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewPatronClick}>New Patron</button>
                    <div className="search-box">
                        <label htmlFor="search">Search by Name:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Enter name"
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Patron ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Birthdate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatrons.map((patron) => (
                                <tr key={patron.patronId}>
                                    <td><button onClick={() => handleEditClick(patron)}>Edit</button></td>
                                    <td><button onClick={() => handleDeleteClick(patron.patronId)}>Delete</button></td>
                                    <td>{patron.patronId}</td>
                                    <td>{patron.firstName}</td>
                                    <td>{patron.lastName}</td>
                                    <td>{patron.email}</td>
                                    <td>{patron.birthdate.substring(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Patrons;
