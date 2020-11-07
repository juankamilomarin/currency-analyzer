import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
    AppBar as MuiAppBar, 
    Toolbar, 
    Typography, 
    Theme,
    createStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  })
);

export default function AppBar(){
    const classes = useStyles(useTheme());

    return (
      <MuiAppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Currency Converter
          </Typography>
        </Toolbar>
      </MuiAppBar>
    )
}
