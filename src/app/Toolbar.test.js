import React from 'react';
import Toolbar from './Toolbar';
import { render } from '@testing-library/react';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

jest.mock('@material-ui/core/AppBar', () => jest.fn())
jest.mock('@material-ui/core/Toolbar', () => jest.fn())
jest.mock('@material-ui/core/Typography', () => jest.fn())
jest.mock('@material-ui/core/IconButton', () => jest.fn())

describe("Toobar", () => {

    beforeEach(() => {
        AppBar.mockImplementation((props) => {
            return (
                <React.Fragment>
                    <div data-testid='appbar-classname'>{props.className}</div>
                    <div data-testid='appbar'>{props.children}</div>
                </React.Fragment>
            )
        })
        MuiToolbar.mockImplementation((props) => <div data-testid='toolbar'>{props.children}</div>)
        Typography.mockImplementation((props) => <div data-testid='typography'>{props.children}</div>)
        IconButton.mockImplementation((props) => {
            return (
                <React.Fragment>
                    <div data-testid='icon-classname'>{props.className}</div>
                    <div data-testid='icon-button'>{props.children}</div>
                </React.Fragment>
            )
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should display title", () => {       
        const { getByTestId } = render(<Toolbar title={'Test title'}/>)
        expect(getByTestId('typography').textContent).toBe('Test title')
    });

    it("should display shifted bar and menu icon when toolbar is open", () => {  
        const { getByTestId } = render(<Toolbar open={true}/>)

        expect(getByTestId('appbar-classname').textContent).toContain('makeStyles-appBarShift')
        expect(getByTestId('icon-classname').textContent).toContain('makeStyles-hide')
    });

    it("should hide shifted bar and menu icon when toolbar is closed", () => {  
        const { getByTestId } = render(<Toolbar open={false}/>)
        expect(getByTestId('appbar-classname').textContent).not.toContain('makeStyles-appBarShift')
        expect(getByTestId('icon-classname').textContent).not.toContain('makeStyles-hide')
    });

});