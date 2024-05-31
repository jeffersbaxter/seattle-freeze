// projfreeze/frontend/src/pages/Reviews.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [patrons, setPatrons] = useState([]);
    const [showAddReview, setShowAddReview] = useState(false);
    const [showEditReview, setShowEditReview] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);
    const [formData, setFormData] = useState({ rating: '', message: '', patronId: '', experienceId: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReviews();
        fetchExperiences();
        fetchPatrons();
    }, []);

    const fetchReviews = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "reviews";
            const response = await axios.get(URL);

            setReviews(response.data);
            setFilteredReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
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
            const filtered = reviews.filter(review =>
                review.rating.toString().includes(query) ||
                review.message.toLowerCase().includes(query.toLowerCase()) ||
                review.title.toLowerCase().includes(query.toLowerCase()) ||
                review.firstName.toLowerCase().includes(query.toLowerCase()) ||
                review.lastName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredReviews(filtered);
        } else {
            setFilteredReviews(reviews);
        }
    };

    const handleNewReviewClick = () => {
        setShowAddReview(true);
        setEditReviewId(null);
        setFormData({ rating: '', message: '', patronId: '', experienceId: '' });
    };

    const handleCancelClick = () => {
        setShowAddReview(false);
        setShowEditReview(false);
        setEditReviewId(null);
        setFormData({ rating: '', message: '', patronId: '', experienceId: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const url = editReviewId ? `${import.meta.env.VITE_API_URL}reviews/${editReviewId}` : `${import.meta.env.VITE_API_URL}reviews`;
        const method = editReviewId ? 'PUT' : 'POST';

        try {
            if (method === "POST") {
                const response = await axios.post(url, formData);
            } else {
                const EDIT_URL = `${import.meta.env.VITE_API_URL}reviews/${editReviewId}`;
                const response = await axios.put(EDIT_URL, formData);
            }

            fetchReviews();
            handleCancelClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEditClick = (review) => {
        setEditReviewId(review.reviewId);
        setFormData({ rating: review.rating, message: review.message, patronId: review.patronId, experienceId: review.experienceId });
        setShowAddReview(true);
        setShowEditReview(true);
    };

    const handleDeleteClick = async (reviewId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}reviews/${reviewId}`;
            const response = await axios.delete(DELETE_URL);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Reviews</h1>
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
            {showAddReview ? (
                <div className="add-review-form">
                    <h2>{editReviewId ? 'Edit Review' : 'Add Review'}</h2>
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
                            <select name="experienceId" disabled={showEditReview} value={formData.experienceId} onChange={handleInputChange}>
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
                            <select name="patronId" disabled={showEditReview} value={formData.patronId} onChange={handleInputChange}>
                                <option value="">Select Patron</option>
                                {patrons.map(patron => (
                                    <option key={patron.patronId} value={patron.patronId}>
                                        {`${patron.firstName} ${patron.lastName}`}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <button type="submit">{editReviewId ? 'Update Review' : 'Add Review'}</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <button onClick={handleNewReviewClick}>New Review</button>
                    <div className="search-box">
                        <label htmlFor="search">Search by Rating, Message, Experience, or Patron:</label>
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
                                <th>Review ID</th>
                                <th>Rating</th>
                                <th>Message</th>
                                <th>Experience</th>
                                <th>Patron</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.reviewId}>
                                    <td><button onClick={() => handleEditClick(review)}>Edit</button></td>
                                    <td><button onClick={() => handleDeleteClick(review.reviewId)}>Delete</button></td>
                                    <td>{review.reviewId}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.message}</td>
                                    {/* <td>{experiences.find(exp => exp.experienceId === review.experienceId)?.title}</td> */}
                                    <td>{review.title}</td>
                                    {/* <td>{`${patrons.find(patron => patron.patronId === review.patronId)?.firstName} ${patrons.find(patron => patron.patronId === review.patronId)?.lastName}`}</td> */}
                                    <td>{review.firstName} {review.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Reviews;
