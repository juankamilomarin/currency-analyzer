import React from 'react';
import AppBar from './AppBar';
import { render, act } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Toolbar from './Toolbar'
import Drawer from './Drawer'

jest.mock('./Toolbar')
jest.mock('./Drawer')

describe("AppBar", () => {

    const history = createMemoryHistory()

    const renderWithRouter = () => {
        return render(
            <Router history={history}>
                <AppBar/>
            </Router>
            )
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should display open toolbar with 'Home' title", () => {
        let open = null
        let title = ''
        Toolbar.mockImplementation((props) => {
            open = props.open
            title = props.title
            return <div data-testid='toolbar'></div>
        })
        Drawer.mockImplementation(() => <div></div>)
        
        const { getByTestId } = renderWithRouter()
        expect(getByTestId('toolbar')).toBeInTheDocument();
        expect(open).toBe(true);
        expect(title).toBe('Home');
    });

    it("should display open drawer", () => {
        let open = null
        Toolbar.mockImplementation(() => <div></div>)
        Drawer.mockImplementation((props) => {
            open = props.open
            return <div data-testid='drawer'></div>
        })
        const { getByTestId } = renderWithRouter()
        expect(getByTestId('drawer')).toBeInTheDocument();
        expect(open).toBe(true);
    });

    it("should close toolbar and drawer when user clicks on drawer's menu item", () => {
        let drawerOpen = null
        let toolbarOpen = null
        let onMenuClick = null
        Toolbar.mockImplementation((props) => {
            toolbarOpen = props.open
            return <div data-testid='toolbar'></div>
        })
        Drawer.mockImplementation((props) => {
            drawerOpen = props.open
            onMenuClick = props.onMenuClick
            return <div data-testid='drawer'></div>
        })
        renderWithRouter()
        act(() => { onMenuClick() })
        expect(toolbarOpen).toBe(false);
        expect(drawerOpen).toBe(false);
    });

    it("should open toolbar and drawer when user clicks on toolbar's menu item", () => {
        let drawerOpen = null
        let toolbarOpen = null
        let onMenuClickToolbar = null
        let onMenuClickDrawer = null
        Toolbar.mockImplementation((props) => {
            toolbarOpen = props.open
            onMenuClickToolbar = props.onMenuClick
            return <div data-testid='toolbar'></div>
        })
        Drawer.mockImplementation((props) => {
            drawerOpen = props.open
            onMenuClickDrawer = props.onMenuClick
            return <div data-testid='drawer'></div>
        })
        renderWithRouter()
        act(() => { onMenuClickDrawer() })
        act(() => { onMenuClickToolbar() })
        expect(toolbarOpen).toBe(true);
        expect(drawerOpen).toBe(true);
    });

    it("should change title when user clicks on a given item on the drawer", () => {
        let title = null
        let onItemClick = null
        Toolbar.mockImplementation((props) => {
            title = props.title
            return <div data-testid='toolbar'></div>
        })
        Drawer.mockImplementation((props) => {
            onItemClick = props.onItemClick
            return <div data-testid='drawer'></div>
        })
        renderWithRouter()
        act(() => { onItemClick('New title') })
        expect(title).toBe('New title');
    });

});