import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import global styles
import App from './App';  // Import the main App component
import { BrowserRouter as Router } from 'react-router-dom';  // For routing

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
