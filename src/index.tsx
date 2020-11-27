import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './config/theme';

import './index.css';
import 'leaflet/dist/leaflet.css';

import { StoreProvider } from 'easy-peasy';
import store from './store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
