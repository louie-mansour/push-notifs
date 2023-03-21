import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
// import Login from "./login";
import Logout from "./logout";
import config from "./config";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Auth0Provider
          domain={config.auth0.DOMAIN}
          clientId={config.auth0.CLIENT_ID}
          authorizationParams={{
              redirect_uri: config.auth0.CALLBACK_URI
          }}
          audience={config.auth0.AUDIENCE}
          response_type='code'
      >
          {/*<a href="https://dev-isnyz8zq.auth0.com/authorize?response_type=code&client_id=ToGq3rWLOjJhBay1i4vDgieN8dlscXHr&redirect_uri=http://localhost:4000/auth/callback&scope=user:edit&audience=http://localhost:4000&state=xyzABC123">Sign In</a>*/}
          {/*<Login />*/}
          <Logout />
          <App />
      </Auth0Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
