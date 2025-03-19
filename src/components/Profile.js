import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import '../App.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile using the token
    axiosInstance.get('/profiles/profile')
      .then(response => {
        console.log('User profile:', response.data);
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <h2 className="profile-name">{user.firstName || "N/A"} {user.surname}</h2>
          <p className="profile-detail">Nickname: {user.nickname}</p>
          <p className="profile-detail">Bio: {user.summary}</p>
          <button className="button" onClick={handleEditProfile} >Edit Profile</button>
        </div>
      ) : (
        <p className="profile-detail">Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;