import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import '../styles/Calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';              
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {

        const response = await api.get('/payments/all');
        const payments = response.data;
        const transformed = payments.map(payment => ({
          title: payment.paymentName,
          start: new Date(payment.paymentDate), 
          end: new Date(payment.paymentDate),
          allDay: true,
        }));

        setEvents(transformed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Payment Calendar</h1>
      <div style={{ height: '80vh', margin: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month" 
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;