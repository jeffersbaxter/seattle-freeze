/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Adapted from auto-generated create-react-app App.js
 * Jackson implemented a simple nav that routes to a page for each entity.
 * Source URL: https://github.com/react-cosmos/create-react-app-example/blob/master/src/App.js
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './style.css'; 
import Home from './pages/Home'; 
import Patrons from './pages/Patrons'; 
import Locations from './pages/Locations'; 
import Experiences from './pages/Experiences'; 
import PaidExperiences from './pages/PaidExperiences'; 
import Reviews from './pages/Reviews'; 
import Roles from './pages/Roles'; 
import RoleCategories from './pages/RoleCategories'; 
import PatronsPost from './pages/PatronsPost';
import PatronsEdit from './pages/PatronsEdit';

// App conditionally renders pages by the URL path.
function App() {
    const [patron, onEditPatron ] = useState([]);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patrons" element={<Patrons onEditPatron={onEditPatron} />} />
                    <Route path="/patrons/create" element={<PatronsPost />} />
                    <Route path="/patrons/edit/:id" element={<PatronsEdit patronToEdit={patron} />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/experiences" element={<Experiences />} />
                    <Route path="/paidExperiences" element={<PaidExperiences />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/roleCategories" element={<RoleCategories />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
