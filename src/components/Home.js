import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Ensure you have the necessary CSS in App.css

const Home = () => {
  const [user, setUser] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [selectedLikedProfile, setSelectedLikedProfile] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {

    // Fetch user 2's profile
    axios.get('http://localhost:8080/api/profiles/2')
      .then(response => {
        console.log('User profile:', response.data);
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching user profile:', error));

    fetchData();
    }, []);

  const fetchData = () => {
    // Fetch liked profiles for user 2
    axios.get('http://localhost:8080/api/likes/user/2')
      .then(response => {
        console.log('Liked profiles:', response.data);
        setLikedProfiles(response.data);
      })
      .catch(error => console.error('Error fetching liked profiles:', error));
    
    // Fetch all profiles (this will be potential matches eventually)
    axios.get('http://localhost:8080/api/profiles/except/2')
      .then(response => {
        console.log('All profiles:', response.data);
        setAllProfiles(response.data);
      })
      .catch(error => console.error('Error fetching liked profiles:', error));
  };

  const handleEditProfile = () => {
    // Redirect to edit profile page (implement this page separately)
    console.log('Edit profile button clicked');
  };

  const handleProfileLikeClick = (profile) => {
    setSelectedLikedProfile(profile);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleLikeProfile = (profileId) => {
    // Implement the unlike functionality
    console.log('Home: Like profile button clicked', profileId);
    axios.post('http://localhost:8080/api/likes', {

            userId: user.id,
            likedUserId: profileId
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Home: Like Profile:', response.data);
        fetchData();
        // setAllProfiles(response.data);
    })
    .catch((error) => {
    if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    });
    // .catch(error => console.error('Error fetching liked profiles:', error));
  };
  
  const handleUnlikeProfile = (profileId) => {
    // Implement the unlike functionality 
    console.log('Unlike profile button clicked', profileId);
    // For now, just remove the profile from the likedProfiles state
    setLikedProfiles(likedProfiles.filter(profile => profile.id !== profileId));
    setSelectedLikedProfile(null);
  };

  const handleBackToList = () => {
    setSelectedLikedProfile(null);
  };

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      {user ? (
        <div className="profile-card">
          <h2 className="profile-name">{user.firstName || "N/A"} {user.surname}</h2>
          <p className="profile-detail">Nickname: {user.nickname}</p>
          <p className="profile-detail">Email: {user.email}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      ) : (
        <p className="profile-detail">Loading user profile...</p>
      )}
      <h2>Liked Profiles</h2>
      {selectedLikedProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedLikedProfile.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedLikedProfile.summary}</p>
          <button onClick={() => handleUnlikeProfile(selectedLikedProfile.id)}>Unlike</button>
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      ) : (
        <div className="profile-list-wrapper">
          <div className="profile-list">
            {likedProfiles.length > 0 ? likedProfiles.map(profile => (
              <div className="profile-card" key={profile.id} onClick={() => handleProfileLikeClick(profile)}>
                <h2 className="profile-name">{profile.nickname || "N/A"}</h2>
              </div>
            )) : <p className="profile-detail">No liked profiles found</p>}
          </div>
        </div>
      )}
      
      <h2>All Profiles</h2>
      {selectedProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedProfile.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedProfile.summary}</p>
          <button onClick={() => handleLikeProfile(selectedProfile.id)}>Like</button>
          <button onClick={() => setSelectedProfile(null)}>Back</button>
        </div>
      ) : (
      <div className="profile-list-wrapper">
        <div className="profile-list">
          {allProfiles.length > 0 ? allProfiles.map(profile => (
            <div className="profile-card" key={profile.id} onClick={() => handleProfileClick(profile)}>
              <h2 className="profile-name">{profile.nickname || "N/A"}</h2>
            </div>
          )) : <p className="profile-detail">No profiles found</p>}
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;