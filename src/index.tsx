import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './app/theme';
import { CssBaseline } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <CssBaseline/>
          <AppContainer />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);