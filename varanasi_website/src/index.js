import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWrapper from './components/AppWrapper';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
      domain="dev-o1zmkq6ult406612.us.auth0.com"
      clientId="1ifiB1t3rkB3AIphj17akG1LkzuTqDVq"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AppWrapper />
    </Auth0Provider>,
  );
reportWebVitals();
