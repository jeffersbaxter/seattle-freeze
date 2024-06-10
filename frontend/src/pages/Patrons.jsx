// projfreeze/frontend/src/pages/Patrons.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style.css'; 

const Patrons = ({ onEditPatron }) => {
    const [patrons, setPatrons] = useState([]);
    const [filteredPatrons, setFilteredPatrons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatrons();
    }, []);

    const fetchPatrons = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "patrons";
            const response = await axios.get(URL);

            setPatrons(response.data);
            setFilteredPatrons(response.data);
        } catch (error) {
            console.error('Error fetching patrons:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filtered = patrons.filter(patron =>
                patron.firstName.toLowerCase().includes(query.toLowerCase()) ||
                patron.lastName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPatrons(filtered);
        } else {
            setFilteredPatrons(patrons);
        }
    };

    const handleNewPatronClick = () => {
        navigate("/patrons/create");
    };

    const handleEditClick = (patron) => {
        onEditPatron(patron);
        navigate(`/patrons/edit/${patron.patronId}`);
    };

    const handleDeleteClick = async (patronId) => {
        try {
            const DELETE_URL = `${import.meta.env.VITE_API_URL}patrons/${patronId}`;
            const response = await axios.delete(DELETE_URL);
            fetchPatrons();
        } catch (error) {
            console.error('Error deleting patron:', error);
        }
    };

    return (
        <div className="container">
            <h2>Patrons</h2>
            <button onClick={handleNewPatronClick}>New Patron</button>
            <div className="search-box">
                <label htmlFor="search" style={{ fontWeight: 'bold'}}>Search by Name:</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter name"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Patron ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatrons.map((patron) => (
                        <tr key={patron.patronId}>
                            <td><button onClick={() => handleEditClick(patron)}>Edit</button></td>
                            <td><button onClick={() => handleDeleteClick(patron.patronId)}>Delete</button></td>
                            <td>{patron.patronId}</td>
                            <td>{patron.firstName}</td>
                            <td>{patron.lastName}</td>
                            <td>{patron.email}</td>
                            <td>{patron.birthdate.substring(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Patrons;
