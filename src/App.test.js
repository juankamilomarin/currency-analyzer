import React from 'react'
import App from './App'
import { render } from './testUtils'
import AppBar from './app/AppBar'
import ExchangeRateTable from './features/exchangeRate/components/ExchangeRateTable'

jest.mock("./app/AppBar", () => jest.fn())
jest.mock("./features/exchangeRate/components/ExchangeRateTable", () => jest.fn())

describe("App", () => {

    beforeEach(() => {
      AppBar.mockImplementation(() => <div data-testid="app-bar"/>)
      ExchangeRateTable.mockImplementation(() => <div data-testid="exchange-rate-table"/>)
    })
    
    afterAll(() => {
      jest.clearAllMocks()
    })

    it("should render appBar", () => {
        const { getByTestId } = render(<App/>);
        expect(getByTestId("app-bar")).toBeInTheDocument();
    });

});