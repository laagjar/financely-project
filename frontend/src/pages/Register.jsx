import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [rawPassword, setRawPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(userName, userEmail, rawPassword, confirmPass);
      if (result === 'User registered successfully') {
        navigate('/login');
      } else {
        setMessage(result);
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
  <div className='login-container'>
  <h2 className='form-title'>Register</h2>
  <form action="#" className='login-form' onSubmit={handleSubmit}>
    <div className="input-wrapper">
      <input type="text" 
       value={userName}
       onChange={(e) => setUserName(e.target.value)}
       placeholder='username' 
       className="input-field"
       required  />
      <i className="material-symbols-rounded">person</i>
    </div>

    <div className="input-wrapper">
      <input type="email" 
       value={userEmail}
       onChange={(e) => setUserEmail(e.target.value)}
       placeholder='email' 
       className="input-field" required />
      <i className="material-symbols-rounded">mail</i>
    </div>

    <div className="input-wrapper">
      <input type="password" value={rawPassword}
       onChange={(e) => setRawPassword(e.target.value)}
       placeholder='password' 
       className="input-field" required />
      <i className="material-symbols-rounded">lock</i>
    </div>

    <div className="input-wrapper">
      <input type="password" 
       value={confirmPass}
       onChange={(e) => setConfirmPass(e.target.value)}
       className="input-field"
       placeholder='confirm password'  required />
    </div>

    <button className='login-button' type='submit'> Register</button>
  </form>
  <p className="signup-text">
  Already have an account? <Link to="/login">Log In here</Link>
  </p>
</div>
  );
};

export default Register;