// projfreeze/frontend/src/pages/PaidExperiences.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const PaidExperiences = () => {
    const [paidExperiences, setPaidExperiences] = useState([]);
    const [filteredPaidExperiences, setFilteredPaidExperiences] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [patrons, setPatrons] = useState([]);
    const [showAddPaidExperience, setShowAddPaidExperience] = useState(false);
    const [editPaidExperienceId, setEditPaidExperienceId] = useState(null);
    const [formData, setFormData] = useState({ cost: '', experienceId: '', patronId: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPaidExperiences();
        fetchExperiences();
        fetchPatrons();
    }, []);

    const fetchPaidExperiences = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "paid-experiences";
            const response = await axios.get(URL);

            setPaidExperiences(response.data);
            setFilteredPaidExperiences(response.data);
        } catch (error) {
            console.error('Error fetching paid experiences:', error);
        }
    };

    const fetchExperiences = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "experiences";
            const response = await axios.get(URL);

            setExperiences(response.data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    const fetchPatrons = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "patrons";
            const response = await axios.get(URL);

            setPatrons(response.data);
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
            const filtered = paidExperiences.filter(paidExperience =>
                paidExperience.cost.toString().includes(query) ||
                experiences.find(exp => exp.experienceId === paidExperience.experienceId)?.title.toLowerCase().includes(query.toLowerCase()) ||
                patrons.find(patron => patron.patronId === paidExperience.patronId)?.firstName.toLowerCase().includes(query.toLowerCase()) ||
                patrons.find(patron => patron.patronId === paidExperience.patronId)?.lastName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPaidExperiences(filtered);
        } else {
            setFilteredPaidExperiences(paidExperiences);
        }
    };

    const handleNewPaidExperienceClick = () => {
        setShowAddPaidExperience(true);
        setEditPaidExperienceId(null);
        setFormData({ cost: '', experienceId: '', patronId: '' });
    };

    const handleCancelClick = () => {
        setShowAddPaidExperience(false);
        setEditPaidExperienceId(null);
        setFormData({ cost: '', experienceId: '', patronId: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editPaidExperienceId ? import.meta.env.VITE_API_URL + "paid-experiences/" + editPaidExperienceId : import.meta.env.VITE_API_URL + "paid-experiences";

        const method = editPaidExperienceId ? 'PUT' : 'POST';

        try {
            if (method === "POST") {
                const response = await axios.post(url, formData);
            } else {
                const response = await axios.put(url, formData);
            }
            fetchPaidExperiences();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (paidExperience) => {
        setEditPaidExperienceId(paidExperience.paidExperienceId);
        setFormData({ cost: paidExperience.cost, experienceId: paidExperience.experienceId, patronId: paidExperience.patronId });
        setShowAddPaidExperience(true);
    };

    const handleDeleteClick = async (paidExperienceId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}paid-experiences/${paidExperienceId}`;
            const response = await axios.delete(DELETE_URL);
            fetchPaidExperiences();
        } catch (error) {
            console.error('Error deleting paid experience:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Paid Experiences</h1>
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
            {showAddPaidExperience ? (
                <div className="add-paid-experience-form">
                    <h2>{editPaidExperienceId ? 'Edit Paid Experience' : 'Add Paid Experience'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Cost:
                            <input type="text" name="cost" value={formData.cost} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Experience:
                            <select name="experienceId" value={formData.experienceId} onChange={handleInputChange}>
                                <option value="">Select Experience</option>
                                {experiences.map(experience => (
                                    <option key={experience.experienceId} value={experience.experienceId}>
                                        {experience.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Patron:
                            <select name="patronId" value={formData.patronId} onChange={handleInputChange}>
                                <option value="">Select Patron</option>
                                {patrons.map(patron => (
                                    <option key={patron.patronId} value={patron.patronId}>
                                        {`${patron.firstName} ${patron.lastName}`}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <button type="submit">{editPaidExperienceId ? 'Update Paid Experience' : 'Add Paid Experience'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewPaidExperienceClick}>New Paid Experience</button>
                    <div className="search-box">
                        <label htmlFor="search">Search by Cost, Experience, or Patron:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Enter search query"
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Paid Experience ID</th>
                                <th>Cost</th>
                                <th>Experience</th>
                                <th>Patron</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPaidExperiences.map((paidExperience) => (
                                <tr key={paidExperience.paidExperienceId}>
                                    <td><button onClick={() => handleEditClick(paidExperience)}>Edit</button></td>
                                    <td><button onClick={() => handleDeleteClick(paidExperience.paidExperienceId)}>Delete</button></td>
                                    <td>{paidExperience.paidExperienceId}</td>
                                    <td>{paidExperience.cost}</td>
                                    <td>{paidExperience.title}</td>
                                    <td>{paidExperience.firstName} {paidExperience.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default PaidExperiences;
