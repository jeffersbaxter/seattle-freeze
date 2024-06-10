import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const PaidExperiences = () => {
    const [paidExperiences, setPaidExperiences] = useState([]);
    const [filteredPaidExperiences, setFilteredPaidExperiences] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaidExperiences();
    }, []);

    const fetchPaidExperiences = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "paid-experiences";
            const response = await axios.get(URL);

            setPaidExperiences(response.data);
            setFilteredPaidExperiences(response.data);
        } catch (error) {
            console.error('Error fetching paid experiences:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = paidExperiences.filter(paidExperience => (
                paidExperience.title.toLowerCase().includes(query.toLowerCase()) || 
                paidExperience.firstName.toLowerCase().includes(query.toLowerCase()) ||
                paidExperience.lastName.toLowerCase().includes(query.toLowerCase())
            ));
            setFilteredPaidExperiences(filtered);
        } else {
            setFilteredPaidExperiences(paidExperiences);
        }
    };

    const handleNewPaidExperienceClick = () => {
        navigate("/paidExperiences/create");
    };

    const handleDeleteClick = async (paidExperienceId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}paid-experiences/${paidExperienceId}`;
            const response = await axios.delete(DELETE_URL);
            fetchPaidExperiences();
        } catch (error) {
            console.error('Error deleting paid experience:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Paid Experiences</h1>
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
            <button onClick={handleNewPaidExperienceClick}>New Paid Experience</button>
                <div className="search-box">
                    <label htmlFor="search" style={{ fontWeight: 'bold'}}>Search by Experience or Patron:</label>
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
                            <th>Delete</th>
                            <th>Paid Experience ID</th>
                            <th>Cost</th>
                            <th>Experience</th>
                            <th>Patron</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPaidExperiences.map((paidExperience) => (
                            <tr key={paidExperience.paidExperienceId}>
                                <td><button onClick={() => handleDeleteClick(paidExperience.paidExperienceId)}>Delete</button></td>
                                <td>{paidExperience.paidExperienceId}</td>
                                <td>{paidExperience.cost}</td>
                                <td>{paidExperience.title}</td>
                                <td>{paidExperience.firstName} {paidExperience.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default PaidExperiences;
