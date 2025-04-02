import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '/src/styles/Payment.css'

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const profileIdParam = searchParams.get('profileId');
    if (profileIdParam) {
      setProfileId(profileIdParam);
      fetchPayments(profileIdParam);
    }
  }, [searchParams]);

  const fetchPayments = async (pid) => {
    try {
      const response = await api.get('/payments', { params: { profileId: pid } });
      setPayments(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch payments');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) {
      return;
    }
    try {
      await api.delete(`/payments/${paymentId}`);
      setPayments(payments.filter((p) => p.id !== paymentId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete payment');
    }
  };

  return (
    <>
    <Navbar />
    <div className="page-container">
    
      <div className="payments-header">
        <h1>Payments</h1>
        {profileId && (
          <Link to={`/payments/new?profileId=${profileId}`} className="btn-primary">
            Add Payment
          </Link>
        )}
      </div>
      
      {error && <p className="error-text">{error}</p>}

      <div className="payment-cards-container">
        {payments.map((pay) => (
          <div key={pay.id} className="payment-card">
            <h3>{pay.paymentName}</h3>
            <p>Amount: <strong>{pay.amount}</strong></p>
            <p>Category: {pay.category}</p>
            <p>Date: {pay.paymentDate}</p>
            <p>Recurring: {pay.recurring ? 'Yes' : 'No'}</p>
            <button className="btn-danger" onClick={() => handleDeletePayment(pay.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default Payments;