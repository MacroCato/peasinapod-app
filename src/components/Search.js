import React, { useState } from 'react';
import SearchCard from './SearchCard'
// import axios from 'axios';
import axiosInstance from './axiosConfig';
import '../App.css';

const Search = () => {
    const [distance, setDistance] = useState('');
    const [gender, setGender] = useState('');
    const [languages, setLanguages] = useState([]);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setLanguages([...languages, value]);
        } else {
            setLanguages(languages.filter((lang) => lang !== value)); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formattedLanguages = languages.map((lang) =>
                lang === "C++" ? "C_plus_plus" : lang
            );

            axiosInstance.get(`/profiles/search`, {
                params: { 
                    gender,
                    distance,
                    languages: formattedLanguages.join(','),
                }
            }, {
                headers: {
                    'Content-Type': 'text/plain',
                }
            })
            .then(response => {
                console.log('Search results:', response.data);
                setResults(response.data);
              })
              .catch(error => console.error('Error fetching liked profiles:', error));

        // Add logic to handle the search request
        } catch (error) {
            console.error('Search failed:', error);
            setErrorMessage('Failed to fetch search results. Please try again.');
        }
    };

    const handleLikeProfile = (profileId) => {
        // Implement the like functionality
        console.log('Home: Like profile button clicked', profileId);
        axiosInstance.post('/likes', {
                userId: localStorage.getItem('userId'),
                profileId: profileId,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Home: Like Profile:', response.data);
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
        setResults((prevResults) => prevResults.filter((profile) => profile.id !== profileId));
    }

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-options">
                    <div className="search-option">
                        <label>Distance (km):</label>
                        <input
                            type="number"
                            placeholder="Enter distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            // required
                        />
                    </div>

                    <div className="search-option">
                        <label>Gender:</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={gender === 'Other'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Other
                        </label>
                    </div>

                    {/* Language Selection */}
                    <div className="search-option">
                        <label>Languages:</label>
                        <label>
                            <input
                                type="checkbox"
                                value="Java"
                                onChange={handleLanguageChange}
                            />
                            Java
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="C++"
                                onChange={handleLanguageChange}
                            />
                            C++
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Python"
                                onChange={handleLanguageChange}
                            />
                            Python
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Javascript"
                                onChange={handleLanguageChange}
                            />
                            Javascript
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Rust"
                                onChange={handleLanguageChange}
                            />
                            Rust
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit">Search</button>
                </div>
            </form>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Display Results */}
            <div className="search-results">
                {results.length > 0 ? (
                    results.map((profile, index) => (
                        <SearchCard key={index} profile={profile} onLike={handleLikeProfile}/>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
                
            {/* Display Results */}
            {/* <div className="search-results">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className="profile-card">
                            <h2 className="profile-name">{result.name}</h2>
                            <p className="profile-detail">Gender: {result.gender}</p>
                            <p className="profile-detail">Distance: {result.distance} km</p>
                            <p className="profile-detail">Languages: {result.languages.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div> */}
        </div>
    );
};

export default Search;