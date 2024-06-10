import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const RolesPost = () => {
    const [patrons, setPatrons] = useState([]);
    const [roleCategories, setRoleCategories] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({ patronId: '', roleCategoryId: '', experienceId: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatrons();
        fetchRoleCategories();
        fetchExperiences();
    }, []);

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

    const handleCancelClick = () => {
        navigate("/roles");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + 'roles';

        try {
            const response = await axios.post(url, formData);

            navigate("/roles");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <div className="add-role-form">
                <h2>Create a Role</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Patron:
                    </label>
                    <select name="patronId" value={formData.patronId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Patron</option>
                        {patrons.map(patron => (
                            <option key={patron.patronId} value={patron.patronId}>
                                {`${patron.firstName} ${patron.lastName}`}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Role Category:
                    </label>
                    <select name="roleCategoryId" value={formData.roleCategoryId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Role Category</option>
                        {roleCategories.map(roleCategory => (
                            <option key={roleCategory.roleCategoryId} value={roleCategory.roleCategoryId}>
                                {roleCategory.roleDescription}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Experience:
                    </label>
                    <select name="experienceId" value={formData.experienceId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Experience</option>
                        {experiences.map(experience => (
                            <option key={experience.experienceId} value={experience.experienceId}>
                                {experience.title}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default RolesPost;
