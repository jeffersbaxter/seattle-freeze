import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Roles = ({ onEditRole }) => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [patrons, setPatrons] = useState([]);
    const [roleCategories, setRoleCategories] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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
        navigate("/roles/create");
    };

    const handleEditClick = (role) => {
        onEditRole(role);
        navigate(`/roles/edit/${role.roleId}`);
    };

    const handleDeleteClick = async (roleId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}roles/${roleId}`;
            const response = await axios.delete(DELETE_URL);
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    return (
        <div className="container">
            <h2>Roles</h2>
            <button onClick={handleNewRoleClick}>New Role</button>
                <div className="search-box">
                    <label htmlFor="search" style={{ fontWeight: 'bold'}}>Search by Patron, Role Category, or Experience:</label>
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
                                <td>{role.firstName} {role.lastName}</td>
                                <td>{role.roleDescription}</td>
                                <td>{role.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default Roles;
