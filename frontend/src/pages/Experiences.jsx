// projfreeze/frontend/src/pages/Experiences.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Experiences = ({ onEditExperience }) => {
    const [experiences, setExperiences] = useState([]);
    const [filteredExperiences, setFilteredExperiences] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "experiences";
            const response = await axios.get(URL);

            setExperiences(response.data);
            setFilteredExperiences(response.data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = experiences.filter(experience =>
                experience.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExperiences(filtered);
        } else {
            setFilteredExperiences(experiences);
        }
    };

    const handleNewExperienceClick = () => {
        navigate("/experiences/create");
    };

    const handleEditClick = (experience) => {
        onEditExperience(experience);
        navigate(`/experiences/edit/${experience.experienceId}`);
    };

    const handleDeleteClick = async (experienceId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}experiences/${experienceId}`;
            const response = await axios.delete(DELETE_URL);
            fetchExperiences();
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Experiences</h1>
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
            <button onClick={handleNewExperienceClick}>New Experience</button>
                <div className="search-box">
                    <label htmlFor="search" style={{ fontWeight: 'bold'}}>Search by Title:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Enter title"
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Experience ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Min Birthdate</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExperiences.map((experience) => (
                            <tr key={experience.experienceId}>
                                <td><button onClick={() => handleEditClick(experience)}>Edit</button></td>
                                <td><button onClick={() => handleDeleteClick(experience.experienceId)}>Delete</button></td>
                                <td>{experience.experienceId}</td>
                                <td>{experience.title}</td>
                                <td>{experience.description}</td>
                                <td>{experience.date.substring(0, 10)}</td>
                                <td>{experience.price}</td>
                                <td>{experience.minBirthdate ? experience.minBirthdate.substring(0, 10) : null}</td>
                                <td>{experience.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default Experiences;
