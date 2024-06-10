/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Adapted from auto-generated create-react-app App.js
 * Jackson implemented a simple nav that routes to a page for each entity.
 * Source URL: https://github.com/react-cosmos/create-react-app-example/blob/master/src/App.js
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './style.css'; 
import './App.css';
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
import ReviewsPost from './pages/ReviewsPost';
import ReviewsEdit from './pages/ReviewsEdit';
import LocationsPost from './pages/LocationsPost';
import LocationsEdit from './pages/LocationsEdit';
import ExperiencesPost from './pages/ExperiencesPost';
import ExperiencesEdit from './pages/ExperiencesEdit';
import PaidExperiencesPost from './pages/PaidExperiencesPost';
import RolesPost from './pages/RolesPost';
import RolesEdit from './pages/RolesEdit';

// App conditionally renders pages by the URL path.
function App() {
    const [patron, onEditPatron ] = useState([]);
    const [review, onEditReview ] = useState([]);
    const [location, onEditLocation ] = useState([]);
    const [experience, onEditExperience ] = useState([]);
    const [ role, onEditRole ] = useState([]);

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Seattle Freeze</h1>
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
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patrons" element={<Patrons onEditPatron={onEditPatron} />} />
                    <Route path="/patrons/create" element={<PatronsPost />} />
                    <Route path="/patrons/edit/:id" element={<PatronsEdit patronToEdit={patron} />} />

                    <Route path="/locations" element={<Locations onEditLocation={onEditLocation} />} />
                    <Route path="/locations/create" element={<LocationsPost />} />
                    <Route path="/locations/edit/:id" element={<LocationsEdit location={location} />} />

                    <Route path="/experiences" element={<Experiences onEditExperience={onEditExperience} />} />
                    <Route path="/experiences/create" element={<ExperiencesPost />} />
                    <Route path="/experiences/edit/:id" element={<ExperiencesEdit experience={experience} />} />

                    <Route path="/paidExperiences" element={<PaidExperiences />} />
                    <Route path="/paidExperiences/create" element={<PaidExperiencesPost />} />

                    <Route path="/reviews" element={<Reviews onEditReview={onEditReview} />} />
                    <Route path="/reviews/create" element={<ReviewsPost />} />
                    <Route path="/reviews/edit/:id" element={<ReviewsEdit review={review} />} />

                    <Route path="/roles" element={<Roles onEditRole={onEditRole} />} />
                    <Route path="/roles/create" element={<RolesPost />} />
                    <Route path="/roles/edit/:id" element={<RolesEdit role={role} />} />

                    <Route path="/roleCategories" element={<RoleCategories />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
