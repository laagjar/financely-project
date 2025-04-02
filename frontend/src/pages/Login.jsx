import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className='login-container'>
      <h2 className='form-title'>Log In</h2>

      <form action="#" className='login-form' onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder='email' 
           className="input-field" required />
          <i className="material-symbols-rounded">mail</i>
        </div>

        <div className="input-wrapper">
          <input type="password" value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder='password' 
           className="input-field" required />
          <i className="material-symbols-rounded">lock</i>
        </div>

        <button type='submit' className='login-button'> Log In</button>
      </form>
      <p className="signup-text">
      Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;