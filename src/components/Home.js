import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from './axiosConfig';
import '../App.css';
import './css/Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [likedByProfiles, setLikedByProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedLikedProfile, setSelectedLikedProfile] = useState(null);
  const [selectedLikedByProfile, setSelectedLikedByProfile] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {

    // Fetch user profile
    axiosInstance.get('/profiles/profile')
      .then(response => {
        console.log('User profile:', response.data);
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
    }, []);

    const fetchData = useCallback(() => {
      // Fetch liked profiles for the user
      axiosInstance.get(`/likes/user/${userId}`)
        .then(response => {
          console.log('Liked profiles:', response.data);
          setLikedProfiles(response.data);
        })
        .catch(error => console.error('Error fetching liked profiles:', error));
      
      // Fetch all profiles except the user
      axiosInstance.get(`/profiles/except/${userId}`)
        .then(response => {
          console.log('All profiles:', response.data);
          setAllProfiles(response.data);
        })
        .catch(error => console.error('Error fetching all profiles:', error));
  
      // Fetch liked by profiles
      axiosInstance.get(`/likes/likedBy/${userId}`)
        .then(response => {
          console.log('Liked by profiles:', response.data);
          setLikedByProfiles(response.data);
        })
        .catch(error => console.error('Error fetching liked by profiles:', error));
  
      // Fetch matches for the user
      axiosInstance.get(`/matches/${userId}`)
        .then(response => {
          console.log('Matches:', response.data);
          setMatches(response.data);
        })
        .catch(error => console.error('Error fetching matches:', error));
    }, [userId]);

    useEffect(() => {
      if (user) {
        fetchData();
      }
    }, [user, userId, fetchData]);

  const handleProfileLikeClick = (profile) => {
    setSelectedLikedProfile(profile);
  };

  const handleProfileLikedByClick = (profile) => {
    setSelectedLikedByProfile(profile);
  }

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleLikeProfile = (profileId) => {
    // Implement the like functionality
    console.log('Home: Like profile button clicked', profileId);
    axiosInstance.post('/likes', {
            userId: user.userId,
            profileId: profileId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Home: Like Profile:', response.data);
          fetchData();
        }
    )
    .catch((error) => {
    if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    });
    setSelectedMatch(null);
    setSelectedLikedProfile(null);
    setSelectedLikedByProfile(null);
    setSelectedProfile(null);
  };
  
  const handleUnlikeProfile = (profileId) => {
    // Implement the unlike functionality 
    console.log('Unlike profile button clicked', profileId);

    axiosInstance.post('/likes/unlike', {
            userId: user.userId,
            profileId: profileId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Home: Unlike Profile:', response.data);
          fetchData();
        }
    )
    .catch((error) => {
    if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    });
    setSelectedMatch(null);
    setSelectedLikedProfile(null);
    setSelectedLikedByProfile(null);
    setSelectedProfile(null);
  };

  const handleBackToList = () => {
    setSelectedLikedProfile(null);
  };

  return (
    <div className="home-container">
      <h2>Perfectly Compiled: Your Code Just Met Its Match!</h2>
      {selectedMatch ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedMatch.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedMatch.summary}</p>
          <p className="profile-name"><strong>{selectedMatch.email}</strong></p>
          <button className="button" onClick={() => handleUnlikeProfile(selectedMatch.id)}>Unlike</button>
          <button className="button" onClick={() => setSelectedMatch(null)}>Back</button>
        </div>
      ) : (
        <div className="profile-list-wrapper">
          <div className="profile-list">
            {matches.length > 0 ? matches.map(match => (
              <div className="profile-card" key={match.id} onClick={() => handleMatchClick(match)}>
                <h2 className="profile-name">{match.nickname || "N/A"}</h2>
              </div>
            )) : <p className="profile-detail">No matches found</p>}
          </div>
        </div>
      )}
      <h2>You've Got a Pull Request: Someone Wants to Merge with You</h2>
      {selectedLikedByProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedLikedByProfile.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedLikedByProfile.summary}</p>
          <button className="button" onClick={() => handleLikeProfile(selectedLikedByProfile.id)}>Like</button>
          <button className="button" onClick={() => setSelectedLikedByProfile(null)}>Back</button>
        </div>
      ) : (
        <div className="profile-list-wrapper">
          <div className="profile-list">
            {likedByProfiles.length > 0 ? likedByProfiles.map(profile => (
              <div className="profile-card" key={profile.id} onClick={() => handleProfileLikedByClick(profile)}>
                <h2 className="profile-name">{profile.nickname || "N/A"}</h2>
              </div>
            )) : <p className="profile-detail">No liked profiles found</p>}
          </div>
        </div>
      )}
      <h2>Added to Your Repository: You Liked Their Code</h2>
      {selectedLikedProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedLikedProfile.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedLikedProfile.summary}</p>
          <button className="button" onClick={() => handleUnlikeProfile(selectedLikedProfile.id)}>Unlike</button>
          <button className="button" onClick={handleBackToList}>Back</button>
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
      
      <h2>Queued for Review: These Profiles Are Awaiting Your Approval</h2>
      {selectedProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedProfile.nickname || "N/A"}</h2>
          <p className="profile-name">{selectedProfile.summary}</p>
          <button className="button" onClick={() => handleLikeProfile(selectedProfile.id)}>Like</button>
          <button className="button" onClick={() => setSelectedProfile(null)}>Back</button>
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