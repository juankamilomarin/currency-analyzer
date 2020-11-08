import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingSpinnerProps } from './types';

const useStyles = makeStyles(theme => ({
    default: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100vh'
    }
}));

export default function LoadingSpinner(props: LoadingSpinnerProps){
    const classes = useStyles(useTheme());

    return (
        <div className={`${classes.default} ${props.className ? props.className : ''}` } style={props.style}>
            <CircularProgress disableShrink />
        </div>
    )
}