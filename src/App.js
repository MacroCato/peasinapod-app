import React from 'react';
import './App.css';
import Profiles from './components/Profiles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </header>
      </div>
    </Router>    
  );
};

export default App;