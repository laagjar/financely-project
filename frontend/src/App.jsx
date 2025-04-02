import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profiles from './pages/Profiles';
import AddProfile from './pages/AddProfile';
import Payments from './pages/Payments';
import AddPayment from './pages/AddPayment';
import PrivateRoute from './components/PrivateRoute';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/new" element={<AddProfile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/new" element={<AddPayment />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;