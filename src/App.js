import React from 'react';
import './App.css';
import Profiles from './components/Profiles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profiles" element={<PrivateRoute><Profiles /></PrivateRoute>} />
              <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            </Routes>
          </main>
        </header>
        {/* <Footer /> */}
      </div>
    </Router>    
  );
};

export default App;