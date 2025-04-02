import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '/src/styles/Profiles.css';


const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/profiles');
      setProfiles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) {
      return;
    }
    try {
      await api.delete(`/profiles/${profileId}`);
      setProfiles(profiles.filter((p) => p.profileId !== profileId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete profile');
    }
  };

  return (
    <>
    <Navbar />
    <div className="page-container">
      <div className="profiles-header">
        <h1>Your Profiles</h1>
        <Link to="/profiles/new" className="btn-primary create-profile-btn">
          Create new profile
        </Link>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="profile-cards-container">
        {profiles.map((profile) => (
          <div key={profile.profileId} className="profile-card">
            <h3>{profile.profileName}</h3>
            <p>Budget: <strong>{profile.budget}</strong></p>
            <p>Currency: <strong>{profile.currency || '-'}</strong></p>
            <div className="card-actions">
              <Link
                to={`/payments?profileId=${profile.profileId}`}
                className="view-payments-link"
              >
                View Payments
              </Link>
              <button
                className="btn-danger"
                onClick={() => handleDeleteProfile(profile.profileId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default Profiles;