import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/home':
        return 'Home';
      case '/login':
        return 'Login';
      case '/register':
        return 'Register';
      case '/profile':
        return 'Profile';
      case '/edit-profile':
        return 'Edit Profile';
      case '/search':
        return 'Search';
      default:
        return 'Peas in a Pod';
    }
  };

  const handleLogout = () => {
    axiosInstance.post('/auth/logout')
      .then(response => {
        console.log('Logout successful:', response.data);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
    };

  return (
    <header className="App-header">
      <Link to="/home" className="home-button">
      <i className="fas fa-home"></i>
      </Link>
        <h1>Beans in a Pod</h1>
      <h2>{getTitle()}</h2>
      {token && (
        <button onClick={handleLogout} className="fas fa-power-off">Logout</button>
      )}
      <Link to="/search" className="header-button">
        <i className="fas fa-search"></i> 
      </Link>
      <Link to="/profile" className="profile-button">
        <i className="fas fa-user"></i>
      </Link>
    </header>
  );
};

export default Header;