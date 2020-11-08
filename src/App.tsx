import React from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import AppBar from './app/AppBar';
import ExchangeRateTable from './features/exchangeRate/components/ExchangeRateTable';

// TODO Add exchange rates to the Redux store
// TODO Add Sidebar
// TODO Update readme file

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
            display: 'flex',
        }
    })
);

function App() {
    const classes = useStyles(useTheme());
    
    return (
        <div className={classes.root}>
            <AppBar/>
            <ExchangeRateTable/>
        </div>
    );
}

export default App;
