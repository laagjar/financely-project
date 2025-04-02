import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const AddProfile = () => {
  const [profileName, setProfileName] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/profiles', {
        profileName,
        budget: parseFloat(budget),
        currency: currency
      });
      navigate('/profiles');
    } catch (err) {
      console.error(err);
      setError('Failed to create profile');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reports-container">
        <h1>Create Profile</h1>
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-row">
              <label htmlFor="profileName">Name:</label>
              <input
                id="profileName"
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="budget">Budget:</label>
              <input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                step="0.01"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="currency">Currency:</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="PLN">PLN</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">
              Save
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddProfile;