
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../style.css';

const ReviewsEdit = ({ review }) => {
    const [formData, setFormData] = useState(review);
    const [patrons, setPatrons] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchExperiences();
        fetchPatrons();
    }, []);

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_API_URL}reviews/${id}`;
            const response = await axios.put(url, formData);
            navigate("/reviews");
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancelClick = () => {
        navigate("/reviews");
    };

    return (
        <>
            <div className="add-review-form">
                <h2>Edit a Review</h2>
                <form onSubmit={handleFormSubmit}>
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Rating (0 - 10):
                    </label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="10" style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Message:
                    </label>
                    <input type="text" name="message" value={formData.message} onChange={handleInputChange} style={{ border: '1.5px solid black'}}/>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Experience:
                    </label>
                    <select name="experienceId" disabled value={formData.experienceId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Experience</option>
                        {experiences.map(experience => (
                            <option key={experience.experienceId} value={experience.experienceId}>
                                {experience.title}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label style={{fontSize: '18px', marginBottom: '0.5px', display: 'block', fontWeight: 'bold'}}>
                        Patron:
                    </label>
                    <select name="patronId" disabled value={formData.patronId} onChange={handleInputChange} style={{ border: '1.5px solid black'}}>
                        <option value="">Select Patron</option>
                        {patrons.map(patron => (
                            <option key={patron.patronId} value={patron.patronId}>
                                {`${patron.firstName} ${patron.lastName}`}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default ReviewsEdit;