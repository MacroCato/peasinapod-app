import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profileListRef = useRef(null);

  useEffect(() => {
    console.log('Fetching profiles...');
    axios.get('http://localhost:8080/api/profiles')
      .then(response => {
        console.log('Response:', response);
        setProfiles(response.data);
      })
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  const fetchProfileById = id => {
    axios.get(`http://localhost:8080/api/profiles/${id}`)
      .then(response => {
        console.log('Response:', response);
        setSelectedProfile(response.data);
      })
      .catch(error => console.error('Error fetching profile:', error));
  };

  const scrollLeft = () => {
    profileListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    profileListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="profile-container">
      {/* <h1>Profiles</h1> */}
      {selectedProfile ? (
        <div className="profile-card">
          <h2 className="profile-name">{selectedProfile.firstName || "N/A"} {selectedProfile.surname}</h2>
          <p className="profile-detail">Email: {selectedProfile.email}</p>
          <button onClick={() => setSelectedProfile(null)}>Back to Profiles</button>
        </div>
      ) : (
        <>
          <button className="scroll-button scroll-button-left" onClick={scrollLeft}>{"<"}</button>
          <div className="profile-list-wrapper">
            <div className="profile-list" ref={profileListRef}>
              {profiles.length > 0 ? profiles.map(profile => (
                <div className="profile-card" key={profile.id} onClick={() => fetchProfileById(profile.id)}>
                  <h2 className="profile-name">{profile.firstName || "N/A"} {profile.surname}</h2>
                  <p className="profile-detail">Email: {profile.email}</p>
                </div>
              )) : <p className="profile-detail">No profiles found</p>}
            </div>
          </div>
          <button className="scroll-button scroll-button-right" onClick={scrollRight}>{">"}</button>
        </>
      )}
    </div>
  );
};

export default Profiles;