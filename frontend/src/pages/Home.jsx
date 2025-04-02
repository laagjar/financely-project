import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import '/src/styles/Home.css'; 

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-left">
          <h1 className="brand-title">financely</h1>
        </div>
        <div className="home-right">
          <h2>Welcome</h2>
          <p>
            Welcome to our payment and finance tracking app!
            Here you can easily record expenses, plan your budget and 
            view statistics.
          </p>

          <p className="contact-info">
            <strong>Contact us:</strong><br/>
            info@financely.com<br/>
          </p>

        </div>
      </div>
    </>
  );
};

export default Home;