import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { List, ListItemIcon,
    ListItemText, Divider, Toolbar, Typography,
    AppBar, CssBaseline, Drawer, MenuItem, IconButton, Menu } from '@material-ui/core'
import { Home, Group, FormatListBulleted, Work, AccountCircle, Book } from '@material-ui/icons'
import { Route, Switch, Redirect, NavLink} from 'react-router-dom'
import RoutePaths from 'constants/RoutePaths'
import Dashboard from 'components/main/Dashboard'
import UserPage from 'components/main/user/UserPage'
import ServicePage from 'components/main/service/ServicePage'
import ServiceTypePage from 'components/main/serviceType/ServiceTypePage'
import Image from 'react-bootstrap/Image'
import Logo from '../../resources/images/logo.png'
import ls from 'local-storage'
import {Link} from 'react-router-dom'
import Timeline from './timeline/Timeline';
import BookedServicePage from './service/BookedServicePage';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 250,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    navLink: {
        textDecoration: 'none',
        color: theme.palette.common.black
    },
    activeLink: {
        backgroundColor: theme.palette.info.light,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: theme.palette.info.light,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow:1
    }
}));

const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.info.light,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);
  
const isActive = (toPath) => {
    const currentPath = window.location.pathname;
    return currentPath.includes(toPath);
};

export default function MainScreen() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navList = () => (
        <div>
            <List>
                <NavLink to={ RoutePaths.TIMELINE } className={classes.navLink}>
                    <StyledMenuItem className={isActive(RoutePaths.TIMELINE) ? classes.activeLink : ''}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText> Timeline </ListItemText>
                    </StyledMenuItem>                    
                </NavLink>

                <NavLink to={ RoutePaths.BOOKED_SERVICE } className={classes.navLink}>
                    <StyledMenuItem className={isActive(RoutePaths.BOOKED_SERVICE) ? classes.activeLink : ''}>
                        <ListItemIcon><Book /></ListItemIcon>
                        <ListItemText> Booked Services </ListItemText>
                    </StyledMenuItem>                    
                </NavLink>

                <Divider />

                <NavLink to={ RoutePaths.USERS_PAGE } className={classes.navLink}>
                    <StyledMenuItem className={isActive(RoutePaths.USERS_PAGE) ? classes.activeLink : ''}>
                        <ListItemIcon><Group /></ListItemIcon>
                        <ListItemText> Users </ListItemText>
                    </StyledMenuItem>
                </NavLink>

                <NavLink to={ RoutePaths.SERVICES_PAGE } className={classes.navLink}>
                    <StyledMenuItem className={isActive(RoutePaths.SERVICES_PAGE) ? classes.activeLink : ''}>
                        <ListItemIcon><Work /></ListItemIcon>
                        <ListItemText> Services </ListItemText>
                    </StyledMenuItem>
                </NavLink>

                <Divider />

                <NavLink to={ RoutePaths.SERVICE_TYPES_PAGE } className={classes.navLink}>
                    <StyledMenuItem className={isActive(RoutePaths.SERVICE_TYPES_PAGE) ? classes.activeLink : ''}>
                        <ListItemIcon><FormatListBulleted /></ListItemIcon>
                        <ListItemText> Service Types </ListItemText>
                    </StyledMenuItem>
                </NavLink>
                
            </List>
        </div>
    );

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const userMenu = () => (
        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit" edge="end"
              >
                <Typography variant="h6" className={classes.menuButton}>
                Hi, {ls.get('currentUser').FirstName}!

                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>My Profile</MenuItem>
                <MenuItem><Link to="/login" style={{ textDecoration: 'none' }}>Logout</Link></MenuItem>
              </Menu>
            </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{background: 'linear-gradient(#a0a0a0 10%, white)'}}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    = &nbsp;&nbsp; <Image src={Logo} fluid className="Header-logo" />
                </Typography>
                { userMenu() }
            </Toolbar>
            </AppBar>
            
            <Drawer className={classes.drawer} variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>

                <div className={classes.toolbar} />

                { navList() }
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Switch>
                    <Route path={ RoutePaths.DASHBOARD } component={ Dashboard } />
                    <Route path={ RoutePaths.TIMELINE } component={Timeline}></Route>
                    <Route path={ RoutePaths.USERS_PAGE } component={ UserPage } />
                    <Route path={ RoutePaths.SERVICES_PAGE } component={ ServicePage } />
                    <Route path={ RoutePaths.SERVICE_TYPES_PAGE } component={ ServiceTypePage } />
                    <Route path={ RoutePaths.BOOKED_SERVICE } component={ BookedServicePage } />
                    <Redirect to={ RoutePaths.MAIN } />
                </Switch>

            </main>
        </div>
    )
}