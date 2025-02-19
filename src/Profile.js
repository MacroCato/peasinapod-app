import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #rgba(7, 7, 148, 0.1);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ProfileListWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const ProfileList = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding: 20px;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, and Opera */
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  cursor: pointer;
  flex: 0 0 auto;
`;

const ProfileName = styled.h2`
  color: #333;
`;

const ProfileDetail = styled.p`
  color: #666;
`;

const ScrollButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const ScrollButtonLeft = styled(ScrollButton)`
  left: 10px;
`;

const ScrollButtonRight = styled(ScrollButton)`
  right: 10px;
`;

const Profile = () => {
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
    <ProfileContainer>
      <h1>Profiles</h1>
      {selectedProfile ? (
        <ProfileCard>
          <ProfileName>{selectedProfile.firstName || "N/A"} {selectedProfile.surname}</ProfileName>
          <ProfileDetail>Email: {selectedProfile.email}</ProfileDetail>
          <button onClick={() => setSelectedProfile(null)}>Back to Profiles</button>
        </ProfileCard>
      ) : (
        <>
          <ScrollButtonLeft onClick={scrollLeft}>{"<"}</ScrollButtonLeft>
          <ProfileListWrapper>
            <ProfileList ref={profileListRef}>
              {profiles.length > 0 ? profiles.map(profile => (
                <ProfileCard key={profile.id} onClick={() => fetchProfileById(profile.id)}>
                  <ProfileName>{profile.firstName || "N/A"} {profile.surname}</ProfileName>
                  <ProfileDetail>Email: {profile.email}</ProfileDetail>
                </ProfileCard>
              )) : <ProfileDetail>No profiles found</ProfileDetail>}
            </ProfileList>
          </ProfileListWrapper>
          <ScrollButtonRight onClick={scrollRight}>{">"}</ScrollButtonRight>
        </>
      )}
    </ProfileContainer>
  );
};

export default Profile;