import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import '../App.css'; // Ensure you have the necessary CSS in App.css
import './css/EditProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    surname: '',
    nickname: '',
    summary: '',
    id: '',
    userId: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/profiles/${user.userId}`, user)
      .then(response => {
        console.log('Profile updated:', response.data);
        navigate('/profile');
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={user.surname}
          onChange={handleChange}
          required
        />
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={user.nickname}
          onChange={handleChange}
          required
        />
        <label htmlFor="summary">Bio</label>
        <textarea
          name="summary"
          placeholder="Bio"
          value={user.summary}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;