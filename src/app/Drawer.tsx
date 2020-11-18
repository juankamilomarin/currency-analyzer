import React from 'react';
import clsx from 'clsx';
import { Route, Link, Redirect } from "react-router-dom";
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import ListAlt from '@material-ui/icons/ListAlt';
import ExchangeRateTable from '../features/exchangeRate/components/ExchangeRateTable';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Converter from '../features/currencyConverter/components/ConverterContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 20,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 20,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  }
})
)

interface DrawerProps { 
  open: boolean,
  onMenuClick: () => void,
  onItemClick: (title: string) => void
}
const Drawer = ({ open, onMenuClick, onItemClick }: DrawerProps) => {
  const classes = useStyles(useTheme());
  const theme = useTheme();

  return (
    <React.Fragment>
      <MuiDrawer 
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onMenuClick}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/converter" onClick={() => onItemClick('Converter')}>
            <ListItemIcon><MonetizationOn/></ListItemIcon>
            <ListItemText primary={'Converter'} />
          </ListItem>
          <ListItem button component={Link} to="/exchange-rates" onClick={() => onItemClick('Exchange Rates')}>
            <ListItemIcon><ListAlt/></ListItemIcon>
            <ListItemText primary={'Exchange Rates'} />
          </ListItem>
        </List>
      </MuiDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/"><Redirect to="/converter"/></Route>
        <Route exact path="/converter" component={Converter} />
        <Route exact path="/exchange-rates" component={ExchangeRateTable} />
      </main>
    </React.Fragment>
  )
}

export default Drawer