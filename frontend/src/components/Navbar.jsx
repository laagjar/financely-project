import React from 'react';
import '/src/styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Navbar = ({theme, setTheme}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <ul className='navbar-center'>
        <li >
          <Link to="/home">Home</Link> |{' '}
          <i className="material-symbols-rounded">home</i>
        </li>
        <li>
          <Link to="/profiles">Profiles</Link> |{' '}
          <i className="material-symbols-rounded">person</i>
        </li>
        <li>
         <Link to="/reports">Reports</Link> |{' '}
         <i className="material-symbols-rounded">description</i>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link> |{' '}
          <i className="material-symbols-rounded">calendar_month</i>
        </li>
      </ul>
      <div className='navbar-right'>
        <button className='logout-button' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;