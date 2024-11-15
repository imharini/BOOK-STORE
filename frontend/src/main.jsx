import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import store from './store/store';
import AppRoutes from './routes/routes';
import './App.css';
import './styles/theme.css';
import './styles/variables.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Provider>
);

