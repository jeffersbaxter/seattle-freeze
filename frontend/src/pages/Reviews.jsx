// projfreeze/frontend/src/pages/Reviews.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Reviews = ({ onEditReview }) => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [formData, setFormData] = useState({ rating: '', message: '', patronId: '', experienceId: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchReviews();
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
        navigate("/reviews/create");
    };

    const handleEditClick = (review) => {
        onEditReview(review);
        navigate(`/reviews/edit/${review.reviewId}`);
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
                            <td>{review.title}</td>
                            <td>{review.firstName} {review.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reviews;
