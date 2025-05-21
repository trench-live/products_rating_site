import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/products" className="home-link">Go to Products</Link>
        </div>
    );
};

export default NotFound;