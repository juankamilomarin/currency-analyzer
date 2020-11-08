import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './app/theme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([])

// In its documentation react-testing-library suggests to create a custom render for your project. More info: https://testing-library.com/docs/react-testing-library/setup
// This render should add all providers your tests need. In this case, all providers used by the app are added too:
// ** Theme Provider (Material UI) was setup with the real theme. There's no need to mock it, and in fact unit tests for components that make use of it should run smoothly
// ** Redux Provider should be setup with a mocked state, in this case such state is provided by each unit test
const customRender = (ui: React.ReactElement, initialState: object = {}, options?: Omit<RenderOptions, 'queries'> ) => {
  const mockedStore = mockStore(initialState)
  return {
    ...render(
      <ThemeProvider theme={theme}>
          <ReduxProvider store={mockedStore}>
            {ui}
          </ReduxProvider>
      </ThemeProvider>
      ,
      { ...options }
    ),
    store: mockedStore
  }
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }
