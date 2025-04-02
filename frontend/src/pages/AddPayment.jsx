
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const AddPayment = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get('profileId');

  const [paymentName, setPaymentName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [recurring, setRecurring] = useState(false);
  const [paymentDate, setPaymentDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments', {
        profileId: parseInt(profileId),
        paymentName,
        amount: parseFloat(amount),
        category,
        color,
        recurring,
        paymentDate
      });
      navigate(`/payments?profileId=${profileId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to save payment');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reports-container">
        <h1>Add Payment</h1>
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-row">
              <label htmlFor="paymentName">Payment Name:</label>
              <input
                id="paymentName"
                type="text"
                value={paymentName}
                onChange={(e) => setPaymentName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="category">Category:</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="color">Color (hex):</label>
              <input
                id="color"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="form-row-check">
              <label htmlFor="recurring">Recurring?</label>
              <input
                id="recurring"
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="paymentDate">Payment Date:</label>
              <input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
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

export default AddPayment;