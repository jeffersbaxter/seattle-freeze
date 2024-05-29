// projfreeze/frontend/src/pages/Experiences.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [filteredExperiences, setFilteredExperiences] = useState([]);
    const [locations, setLocations] = useState([]);
    const [showAddExperience, setShowAddExperience] = useState(false);
    const [editExperienceId, setEditExperienceId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', price: '', minBirthdate: '', locationId: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchExperiences();
        fetchLocations();
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

    const fetchLocations = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "locations";
            const response = await axios.get(URL);

            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
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
            const filtered = experiences.filter(experience =>
                experience.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExperiences(filtered);
        } else {
            setFilteredExperiences(experiences);
        }
    };

    const handleNewExperienceClick = () => {
        setShowAddExperience(true);
        setEditExperienceId(null);
        setFormData({ title: '', description: '', date: '', price: '', minBirthdate: '', locationId: '' });
    };

    const handleCancelClick = () => {
        setShowAddExperience(false);
        setEditExperienceId(null);
        setFormData({ title: '', description: '', date: '', price: '', minBirthdate: '', locationId: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editExperienceId ? `${import.meta.env.VITE_API_URL}experiences/${editExperienceId}` : import.meta.env.VITE_API_URL + 'experiences';
        const method = editExperienceId ? 'PUT' : 'POST';

        try {
            // TODO: CREATE/EDIT Experiences
            // await fetch(url, {
            //     method,
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });
            fetchExperiences();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (experience) => {
        setEditExperienceId(experience.experienceId);
        setFormData({ title: experience.title, description: experience.description, date: experience.date, price: experience.price, minBirthdate: experience.minBirthdate, locationId: experience.locationId });
        setShowAddExperience(true);
    };

    const handleDeleteClick = async (experienceId) => {
        try {
            // TODO: DELETE Experience by ID
            // await fetch(`${import.meta.env.VITE_API_URL}experiences/${experienceId}`, { method: 'DELETE' });
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
                    <li><Link to="/paidExperiences">Paid Experiences</Link></li>
                    <li><Link to="/locations">Locations</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/roleCategories">Role Categories</Link></li>
                </ul>
            </nav>
            {showAddExperience ? (
                <div className="add-experience-form">
                    <h2>{editExperienceId ? 'Edit Experience' : 'Add Experience'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Description:
                            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Date:
                            <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Price:
                            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Min Birthdate:
                            <input type="date" name="minBirthdate" value={formData.minBirthdate} onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Location:
                            <select name="locationId" value={formData.locationId} onChange={handleInputChange}>
                                <option value="">Select Location</option>
                                {locations.map(location => (
                                    <option key={location.locationId} value={location.locationId}>
                                        {`${location.addressNumber} ${location.streetName}, ${location.city}, ${location.state}, ${location.zipCode}`}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <button type="submit">{editExperienceId ? 'Update Experience' : 'Add Experience'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewExperienceClick}>New Experience</button>
                    <div className="search-box">
                        <label htmlFor="search">Search by Title:</label>
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
                                    {/* <td>{locations.find(location => location.locationId === experience.locationId)?.addressNumber + ' ' + locations.find(location => location.locationId === experience.locationId)?.streetName + ', ' + locations.find(location => location.locationId === experience.locationId)?.city + ', ' + locations.find(location => location.locationId === experience.locationId)?.state + ', ' + locations.find(location => location.locationId === experience.locationId)?.zipCode}</td> */}
                                    <td>{experience.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Experiences;
