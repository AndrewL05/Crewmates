import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <div className="error-actions">
        <Link to="/" className="action-button create-button">Go Home</Link>
        <Link to="/gallery" className="action-button gallery-button">View Gallery</Link>
      </div>
    </div>
  );
};

export default Error;