// projfreeze/frontend/src/pages/Roles.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [patrons, setPatrons] = useState([]);
    const [roleCategories, setRoleCategories] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [showAddRole, setShowAddRole] = useState(false);
    const [editRoleId, setEditRoleId] = useState(null);
    const [formData, setFormData] = useState({ patronId: '', roleCategoryId: '', experienceId: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRoles();
        fetchPatrons();
        fetchRoleCategories();
        fetchExperiences();
    }, []);

    const fetchRoles = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "roles";
            const response = await axios.get(URL);

            setRoles(response.data);
            setFilteredRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
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

    const fetchRoleCategories = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "role-categories";
            const response = await axios.get(URL);

            setRoleCategories(response.data);
        } catch (error) {
            console.error('Error fetching role categories:', error);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = roles.filter(role =>
                patrons.find(patron => patron.patronId === role.patronId)?.firstName.toLowerCase().includes(query.toLowerCase()) ||
                patrons.find(patron => patron.patronId === role.patronId)?.lastName.toLowerCase().includes(query.toLowerCase()) ||
                roleCategories.find(roleCategory => roleCategory.roleCategoryId === role.roleCategoryId)?.roleDescription.toLowerCase().includes(query.toLowerCase()) ||
                experiences.find(exp => exp.experienceId === role.experienceId)?.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRoles(filtered);
        } else {
            setFilteredRoles(roles);
        }
    };

    const handleNewRoleClick = () => {
        setShowAddRole(true);
        setEditRoleId(null);
        setFormData({ patronId: '', roleCategoryId: '', experienceId: '' });
    };

    const handleCancelClick = () => {
        setShowAddRole(false);
        setEditRoleId(null);
        setFormData({ patronId: '', roleCategoryId: '', experienceId: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editRoleId ? `${import.meta.env.VITE_API_URL}roles/${editRoleId}` : import.meta.env.VITE_API_URL + 'roles';
        const method = editRoleId ? 'PUT' : 'POST';

        try {
            // TODO: CREATE/EDIT Roles
            if (method === "POST") {
                const response = await axios.post(url, formData);
            } else {
                const EDIT_URL = `${import.meta.env.VITE_API_URL}roles/${editRoleId}`;
                const response = await axios.put(EDIT_URL, formData);
            }
            fetchRoles();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (role) => {
        setEditRoleId(role.roleId);
        setFormData({ patronId: role.patronId, roleCategoryId: role.roleCategoryId, experienceId: role.experienceId });
        setShowAddRole(true);
    };

    const handleDeleteClick = async (roleId) => {
        try {
            // TODO: DELETE Roles
            const DELETE_URL = `${import.meta.env.VITE_API_URL}roles/${roleId}`;
            const response = await axios.delete(DELETE_URL);
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Roles</h1>
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
            {showAddRole ? (
                <div className="add-role-form">
                    <h2>{editRoleId ? 'Edit Role' : 'Add Role'}</h2>
                    <form onSubmit={handleFormSubmit}>
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
                        <label>
                            Role Category:
                            <select name="roleCategoryId" value={formData.roleCategoryId} onChange={handleInputChange}>
                                <option value="">Select Role Category</option>
                                {roleCategories.map(roleCategory => (
                                    <option key={roleCategory.roleCategoryId} value={roleCategory.roleCategoryId}>
                                        {roleCategory.roleDescription}
                                    </option>
                                ))}
                            </select>
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
                        <button type="submit">{editRoleId ? 'Update Role' : 'Add Role'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewRoleClick}>New Role</button>
                    <div className="search-box">
                        <label htmlFor="search">Search by Patron, Role Category, or Experience:</label>
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
                                <th>Role ID</th>
                                <th>Patron</th>
                                <th>Role Category</th>
                                <th>Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoles.map((role) => (
                                <tr key={role.roleId}>
                                    <td><button onClick={() => handleEditClick(role)}>Edit</button></td>
                                    <td><button onClick={() => handleDeleteClick(role.roleId)}>Delete</button></td>
                                    <td>{role.roleId}</td>
                                    {/* <td>{`${patrons.find(patron => patron.patronId === role.patronId)?.firstName} ${patrons.find(patron => patron.patronId === role.patronId)?.lastName}`}</td> */}
                                    <td>{role.firstName} {role.lastName}</td>
                                    {/* <td>{roleCategories.find(roleCategory => roleCategory.roleCategoryId === role.roleCategoryId)?.roleDescription}</td> */}
                                    <td>{role.roleDescription}</td>
                                    {/* <td>{experiences.find(exp => exp.experienceId === role.experienceId)?.title}</td> */}
                                    <td>{role.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Roles;
