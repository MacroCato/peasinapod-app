import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
// import logo from '../resources/logo.png';

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
      case '/profiles':
        return 'Profiles';
      case '/profile':
        return 'Profile';
        case '/edit-profile':
        return 'Edit Profile';
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
      {/* <div className="header-content">
        <img src={logo} alt="Logo" className="logo" /> */}
        <h1>Beans in a Pod</h1>
      {/* </div> */}
      <h2>{getTitle()}</h2>
      {token && (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      )}
      <nav>
        {/* <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul> */}
      </nav>
      <Link to="/profile" className="profile-button">
        <i className="fas fa-user"></i>
      </Link>
    </header>
  );
};

export default Header;