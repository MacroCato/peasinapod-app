import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import '../App.css';

const MyLikes = () => {
    const [likedProfiles, setLikedProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null); // State for the selected profile
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch the list of liked profiles when the component loads
        const fetchLikedProfiles = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Get the user ID from local storage
                const response = await axiosInstance.get(`/likes/user/${userId}`);
                setLikedProfiles(response.data); // Store the liked profiles in state
            } catch (error) {
                console.error('Error fetching liked profiles:', error);
                setErrorMessage('Failed to load liked profiles. Please try again later.');
            }
        };

        fetchLikedProfiles();
    }, []);

    const handleUnlike = async (profileId) => {
        try {
            const userId = localStorage.getItem('userId'); // Get the user ID from local storage
            axiosInstance.post('/likes/unlike', {
                userId: userId,
                profileId: profileId,
            }, {
                 headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Home: Unlike Profile:', response.data);
            })
            // Remove the profile from the likedProfiles list
            setLikedProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== profileId));
            setSelectedProfile(null); // Clear the selected profile
        } catch (error) {
            console.error('Error unliking profile:', error);
            setErrorMessage('Failed to unlike the profile. Please try again later.');
        }
    };

    return (
        <div className="my-likes-container">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {selectedProfile ? (
                <div className="profile-card">
                    <h2 className="profile-name">{selectedProfile.nickname || "N/A"}</h2>
                    <p className="profile-name">{selectedProfile.summary}</p>
                    <p className="profile-name"><strong>{selectedProfile.email}</strong></p>
                    <button className="button" onClick={() => handleUnlike(selectedProfile.id)}>Unlike</button>
                    <button className="button" onClick={() => setSelectedProfile(null)}>Back</button>
                </div>
            ) : (
                <div className="mylikes-list-wrapper">
                    <div className="mylikes-list">
                        {likedProfiles.length > 0 ? likedProfiles.map(profile => (
                            <div className="profile-card" key={profile.id} onClick={() => setSelectedProfile(profile)}>
                            <h2 className="profile-name">{profile.nickname || "N/A"}</h2>
                          </div>
            )) : <p className="profile-detail">No like profiles found</p>}
          </div>
        </div>
      )}
        </div>
    );
};

export default MyLikes;