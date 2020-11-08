import React from 'react'
import App from './App'
import { render } from './testUtils'
import AppBar from './app/AppBar'
import { DateTime } from 'luxon'
import ExchangeRateTable from './features/exchangeRate/components/ExchangeRateTable'

const mockAppBar = AppBar as jest.Mock
jest.mock("./app/AppBar", () => jest.fn())
const mockExchangeRateTable = ExchangeRateTable as jest.Mock
jest.mock("./features/exchangeRate/components/ExchangeRateTable", () => jest.fn())

describe("App", () => {

    beforeEach(() => {
      mockAppBar.mockImplementation(() => <div data-testid="app-bar"/>)
      mockExchangeRateTable.mockImplementation(() => <div data-testid="exchange-rate-table"/>)
    })
    
    afterAll(() => {
      jest.clearAllMocks()
    })

    it("should render appBar", () => {
        const { getByTestId } = render(<App/>);
        expect(getByTestId("app-bar")).toBeInTheDocument();
    });

    it("should render exchange rate table", () => {
      const state = {
        exchangeRate: {
            loading: false,
            selectedDate: DateTime.local()
        }
      }
      const { getByTestId } = render(<App/>, state);
      expect(getByTestId("exchange-rate-table")).toBeInTheDocument();
  });

});