
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css';

const ReviewsPost = () => {
    const [formData, setFormData] = useState({ rating: '', message: '', patronId: '', experienceId: '' });
    const [patrons, setPatrons] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetchReviews();
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
        const url = import.meta.env.VITE_API_URL + 'reviews';

        try {
            const response = await axios.post(url, formData);

            navigate("/reviews");
        } catch (error) {
            console.error('Error creating a Review:', error);
        }
    };

    const handleCancelClick = () => {
        navigate("/reviews");
    };

    return (
        <>
            <header>
                <h1>Reviews | Create</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/experiences">Experiences</Link></li>
                    <li><Link to="/paidExperiences">Paid Experiences</Link></li>
                    <li><Link to="/locations">Locations</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/roleCategories">Role Categories</Link></li>
                </ul>
            </nav>
            <div className="add-review-form">
                <h2>Create a Review</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Rating (0 - 10):
                        <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="10" />
                    </label>
                    <br />
                    <label>
                        Message:
                        <input type="text" name="message" value={formData.message} onChange={handleInputChange} />
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
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </>
    );
};

export default ReviewsPost;