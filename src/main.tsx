import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeLDwUrAAAAAAfOu0--tYroPwbZ-g70AptYgXRC"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head'
      }}
    >
      <App />
      <ToastContainer position="top-right" autoClose={5000} />
    </GoogleReCaptchaProvider>
  </StrictMode>
);