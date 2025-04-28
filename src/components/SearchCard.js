import React from 'react';
import '../App.css';

const SearchCard = ({ profile, onLike }) => {
    return (
        <div className="profile-card">
            <h2 className="profile-name">{profile.nickname}</h2>
            <p className="profile-detail">Summary: {profile.summary}</p>
            <button className="button" onClick={() => onLike(profile.id)}>
                Like
            </button>
        </div>
    );
};

export default SearchCard;