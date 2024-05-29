// projfreeze/frontend/src/pages/Home.js

import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <header>
                <h1>Seattle Freeze</h1>
                <nav>
                    <ul>
                        <li><a href="/patrons">Patrons</a></li>
                        <li><a href="/experiences">Experiences</a></li>
                        <li><a href="/paidExperiences">Paid Experiences</a></li>
                        <li><a href="/locations">Locations</a></li>
                        <li><a href="/reviews">Reviews</a></li>
                        <li><a href="/roles">Roles</a></li>
                        <li><a href="/roleCategories">Role Categories</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Home;

