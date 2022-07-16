import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css'
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer className='toast-container'
        position="top-center"
        hideProgressBar={true}
        closeOnClick
        newestOnTop={true}
        autoClose={3000}
      />
      </Provider>
  </React.StrictMode>
);

