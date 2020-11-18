import React from 'react';
import Drawer from './Drawer';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExchangeRateTable from '../features/exchangeRate/components/ExchangeRateTable';
import Converter from '../features/currencyConverter/components/ConverterContainer';

jest.mock('@material-ui/core/Drawer', () => jest.fn())
jest.mock('@material-ui/core/List', () => jest.fn())
jest.mock('@material-ui/core/ListItem', () => jest.fn())
jest.mock('@material-ui/core/ListItemText', () => jest.fn())
jest.mock('@material-ui/core/IconButton', () => jest.fn())
jest.mock('../features/exchangeRate/components/ExchangeRateTable', () => jest.fn())
jest.mock('../features/currencyConverter/components/ConverterContainer', () => jest.fn())

describe("Drawer", () => {
    const renderWithRouter = (component, history) => {
        return render(
            <Router history={history}>
                {component}
            </Router>
            )
    }

    beforeEach(() => {
        MuiDrawer.mockImplementation((props) => {
            return (
                <React.Fragment>
                    <div data-testid='drawer-classname'>{props.className}</div>
                    <div data-testid='drawer-classes-paper'>{props.classes.paper}</div>
                    <div data-testid='drawer'>{props.children}</div>
                </React.Fragment>
            )
        })
        List.mockImplementation((props) => <div data-testid={`list-${props.to}`}>{props.children}</div>)
        ListItem.mockImplementation((props) => <div data-testid='list-item'>{props.children}</div>)
        ListItemText.mockImplementation((props) => <div data-testid={`list-item-text-${props.primary}`}></div>)
        IconButton.mockImplementation((props) => <div data-testid='icon-button'>{props.children}</div>)
        ExchangeRateTable.mockImplementation((props) => <div data-testid='exchange-rate-table'>{props.children}</div>)
        Converter.mockImplementation((props) => <div data-testid='converter'>{props.children}</div>)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should display drawer when it's open", () => {
        const { getByTestId } = renderWithRouter(<Drawer open={true}/>, createMemoryHistory())
        expect(getByTestId('drawer-classname').textContent).toContain('makeStyles-drawerOpen')
        expect(getByTestId('drawer-classes-paper').textContent).toContain('makeStyles-drawerOpen')
    });

    it("should hide drawer when it's closed", () => {
        const { getByTestId } = renderWithRouter(<Drawer open={false}/>, createMemoryHistory())
        expect(getByTestId('drawer-classname').textContent).toContain('makeStyles-drawerClose')
        expect(getByTestId('drawer-classes-paper').textContent).toContain('makeStyles-drawerClose')
    });

    it("should list menu options", () => {
        const { getByTestId } = renderWithRouter(<Drawer/>, createMemoryHistory())
        expect(getByTestId('list-item-text-Converter')).toBeInTheDocument()
        expect(getByTestId('list-item-text-Exchange Rates')).toBeInTheDocument()
    });

    it("should display converter component", () => {
        const { getByTestId } = renderWithRouter(<Drawer/>, createMemoryHistory())
        expect(getByTestId('converter')).toBeInTheDocument()
    });

    it("should display exchange rates table", () => {
        const history = createMemoryHistory()
        history.push('/exchange-rates')
        const { getByTestId } = renderWithRouter(<Drawer/>, history)
        expect(getByTestId('exchange-rate-table')).toBeInTheDocument()
    });

});