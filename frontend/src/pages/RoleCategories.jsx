// projfreeze/frontend/src/pages/RoleCategories.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const RoleCategories = () => {
    const [roleCategories, setRoleCategories] = useState([]);
    const [filteredRoleCategories, setFilteredRoleCategories] = useState([]);
    const [showAddRoleCategory, setShowAddRoleCategory] = useState(false);
    const [editRoleCategoryId, setEditRoleCategoryId] = useState(null);
    const [formData, setFormData] = useState({ roleDescription: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRoleCategories();
    }, []);

    const fetchRoleCategories = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "role-categories";
            const response = await axios.get(URL);

            setRoleCategories(response.data);
            setFilteredRoleCategories(response.data);
        } catch (error) {
            console.error('Error fetching role categories:', error);
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
            const filtered = roleCategories.filter(roleCategory =>
                roleCategory.roleDescription.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRoleCategories(filtered);
        } else {
            setFilteredRoleCategories(roleCategories);
        }
    };

    const handleNewRoleCategoryClick = () => {
        setShowAddRoleCategory(true);
        setEditRoleCategoryId(null);
        setFormData({ roleDescription: '' });
    };

    const handleCancelClick = () => {
        setShowAddRoleCategory(false);
        setEditRoleCategoryId(null);
        setFormData({ roleDescription: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editRoleCategoryId ? `${import.meta.env.VITE_API_URL}role-categories/${editRoleCategoryId}` : `${import.meta.env.VITE_API_URL}role-categories`;
        const method = editRoleCategoryId ? 'PUT' : 'POST';

        try {
            if (method === "POST") {
                const response = await axios.post(url, formData);
            } else {
                const response = await axios.put(url, formData);
            }

            fetchRoleCategories();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (roleCategory) => {
        setEditRoleCategoryId(roleCategory.roleCategoryId);
        setFormData({ roleDescription: roleCategory.roleDescription });
        setShowAddRoleCategory(true);
    };

    return (
        <div className="container">
            <header>
                <h1>Role Categories</h1>
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
            {showAddRoleCategory ? (
                <div className="add-role-category-form">
                    <h2>{editRoleCategoryId ? 'Edit Role Category' : 'Add Role Category'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                            Description:
                            <input type="text" name="roleDescription" value={formData.roleDescription} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                        </label>
                        <br />
                        <button type="submit">{editRoleCategoryId ? 'Update Role Category' : 'Add Role Category'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewRoleCategoryClick}>New Role Category</button>
                    <div className="search-box">
                        <label htmlFor="search" style={{ fontWeight: 'bold'}}>Search by Description:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Role Category ID</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoleCategories.map((roleCategory) => (
                                <tr key={roleCategory.roleCategoryId}>
                                    <td><button onClick={() => handleEditClick(roleCategory)}>Edit</button></td>
                                    <td>{roleCategory.roleCategoryId}</td>
                                    <td>{roleCategory.roleDescription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default RoleCategories;
