import React from 'react';
import { Link } from 'react-router';
import '../App.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/create"><h3>Create Crewmate</h3></Link>
        <Link to="/gallery"><h3>Crewmate Gallery</h3></Link>
    </div>
  );
};

export default Sidebar;