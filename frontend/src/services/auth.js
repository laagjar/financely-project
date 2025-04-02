import api from './api';
import axios from 'axios';

export const login = async (email, password) => {
  const token = btoa(`${email}:${password}`);
  localStorage.setItem('authToken', token);
  
  try {
    const response = await api.get('/me');
    localStorage.setItem('user', response.data.email);
    return response.data;
  } catch (error) {
    localStorage.removeItem('authToken');
    throw error;
  }
};

export const register = async (userName, userEmail, rawPassword, confirmPass) => {
  try {
    const response = await api.post('/register', { userName, userEmail, rawPassword, confirmPass });
    return response.data.message || response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Logout error', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};