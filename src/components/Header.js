import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/home" className="home-button">
      <i className="fas fa-home"></i>
      </Link>
      <h1>Peas in a Pod</h1>
      <nav>
        {/* <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul> */}
      </nav>
      <Link to="/profiles" className="profile-button">
        <i className="fas fa-user"></i>
      </Link>
    </header>
  );
};

export default Header;