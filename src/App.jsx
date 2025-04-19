import { useState } from 'react'
import './App.css'
import client from './Client';
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router';

const App = () => {

  return (
    <div className="app">
      
      <Sidebar/>
      <div className="page-content">
        <Outlet/>
      </div>
    </div>  
    
  );
};

export default App;
