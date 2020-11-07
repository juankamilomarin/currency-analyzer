import React from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import AppBar from './app/AppBar';

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
        </div>
    );
}

export default App;
