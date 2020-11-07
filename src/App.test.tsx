import React from 'react';
import App from './App';
import { render } from '@testing-library/react'; // TODO Add custom testUtils
import AppBar from './app/AppBar'

const mockedAppBar = AppBar as jest.Mock
jest.mock("./app/AppBar", () => jest.fn())

describe("App", () => {

    beforeEach(() => {
      mockedAppBar.mockImplementation(() => <div data-testid="app-bar"/>)
    })
    

    it("should render appBar", () => {
        const { getByTestId } = render(<App/>);
        expect(getByTestId("app-bar")).toBeInTheDocument();
    });

});