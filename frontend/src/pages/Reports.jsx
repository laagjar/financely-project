import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import '/src/styles/Reports.css';  

import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Reports = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [categorySums, setCategorySums] = useState({});
  const [totalSpent, setTotalSpent] = useState(0.0);
  const [details, setDetails] = useState([]); 

  const [monthlyData, setMonthlyData] = useState({}); 
  const [year, setYear] = useState(new Date().getFullYear());

  const [chartType, setChartType] = useState('pie');

  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await api.get('/profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load profiles');
    }
  };

  const fetchCategoriesInRange = async () => {

    if (!selectedProfileId || !startDate || !endDate) {
      setError('Please select profile and date range');
      return;
    }

    try {
      setError('');
      const res = await api.get('/reports/categories/range', {
        params: {
          profileId: selectedProfileId,
          start: startDate,
          end: endDate
        }
      });
      const data = res.data;
      setCategorySums(data.categorySums || {});
      setTotalSpent(data.totalSpent || 0);
      setDetails(data.details || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load category data');
    }
  };

  const fetchMonthly = async () => {

    if (!selectedProfileId || !year) {
      setError('Please select profile and year');
      return;
    }
    try {
      setError('');
      const res = await api.get('/reports/monthly', {
        params: {
          profileId: selectedProfileId,
          year
        }
      });
      setMonthlyData(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load monthly data');
    }
  };

  const handleProfileChange = (e) => {
    setSelectedProfileId(e.target.value);
    setCategorySums({});
    setDetails([]);
    setMonthlyData({});
    setError('');
  };

  const pieLabels = Object.keys(categorySums);
  const pieValues = Object.values(categorySums);
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          '#a2d2ff',
          '#ffc8dd',
          '#bde0fe',
          '#cdb4db',
          '#ffffc8',
          '#84b59a',
          '#5fc08b',
        ],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const barLabels = Object.keys(monthlyData)
    .sort((a, b) => Number(a) - Number(b)); 
  const barValues = barLabels.map((m) => monthlyData[m]);
  const barData = {
    labels: barLabels.map((m) => `Month ${m}`),
    datasets: [
      {
        label: 'Expenses',
        data: barValues,
        backgroundColor: '#5fc08b',
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Expenses in ${year}`,
      },
    },
  };

  const currentProfile = profiles.find((p) => p.profileId === Number(selectedProfileId));
  const budget = currentProfile?.budget || 0;
  const spentPercent = budget > 0 ? (totalSpent / budget) * 100 : 0;

  return (
    <div>
      <Navbar />
      <div className="reports-container">
        <h1>Reports</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="reports-row">
          <label>Profile:</label>
          <select value={selectedProfileId} onChange={handleProfileChange}>
            <option value="">-- select profile --</option>
            {profiles.map((prof) => (
              <option key={prof.profileId} value={prof.profileId}>
                {prof.profileName}
              </option>
            ))}
          </select>
        </div>

        <div className="reports-row">
          <label>Start Date:</label>
          <input 
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input 
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="btn-primary" onClick={fetchCategoriesInRange}>
            Load Category Report
          </button>
        </div>

        <div className="reports-row">
          <label htmlFor="chartType">Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="pie">Pie (Categories in range)</option>
            <option value="bar">Bar (Monthly in year)</option>
          </select>
        </div>

        {chartType === 'bar' && (
          <div className="reports-row">
            <label>Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <button className="btn-primary" onClick={fetchMonthly}>
              Load Monthly Report
            </button>
          </div>
        )}

        {chartType === 'pie' && (
          <div className="progress-container">
            <p>
              Budget: <strong>{budget}</strong> | Spent: <strong>{totalSpent.toFixed(2)}</strong>
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${spentPercent}%` }}
              >
                {spentPercent.toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        <div style={{ width: '600px', margin: '1rem auto' }}>
          {chartType === 'pie' && pieLabels.length > 0 && (
            <Pie data={pieData} options={pieOptions} />
          )}
          {chartType === 'bar' && barLabels.length > 0 && (
            <Bar data={barData} options={barOptions} />
          )}
        </div>

        {chartType === 'pie' && details.length > 0 && (
          <div className="details-accordion">
            <h3>Detailed Payments</h3>
            {details.map((pay) => (
              <div className="accordion-item" key={pay.id}>
                <div className="accordion-summary">
                  <span>{pay.paymentName} - {pay.paymentDate}</span>
                  <span>({pay.amount})</span>
                </div>
                <div className="accordion-details">
                  Category: {pay.category} <br/>
                  Recurring: {pay.recurring ? 'Yes' : 'No'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;