import React, { useContext, useEffect } from 'react';

import { getAllMsgs } from '../../actions/msg.actions';
import { CTX } from '../../Store';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SendBox from './SendBox';
import Fab from '@material-ui/core/Fab';
import {Link, withRouter} from 'react-router-dom';
import {getUsers} from '../../actions/msg.actions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        position: 'relative'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    sendBox: {
    },
    allMsgs: {
        marginBottom: 50,
    },
    appBarBottom: {
        borderRadius: 5,
        top: 'auto',
        bottom: 2,
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    fab: {
        margin: theme.spacing(0.2),
    },
    msg: {

    }
}));

function MsgBox(props) {

    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const  dispatch= useContext(CTX).msgs[1];
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [{users}, dispatchUsers] = useContext(CTX).users;

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }
    useEffect(() => {
        getAllMsgs(dispatch);
        getUsers(dispatchUsers)
    }, [])
    const drawer = (<div>
        <div className={classes.toolbar} style={{ color: "#fff", background: '#3f51b5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6"  >
                Users
            </Typography>
        </div>
        <Divider />
        <List>
            {users.map((user, index) => (
                <Link to={`/chat/${user._id}`}><ListItem button key={user.login}  >
                    
                    <ListItemText primary={user.login} />
                </ListItem></Link>
            ))}
        </List>

    </div>)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap >
                        Messagges Box
                    </Typography>
                    <Link style={{position: 'absolute', color: '#fff', top: 0, right:'4px'}}  to='/home'><Typography variant="h6" noWrap >
                        Home
                    </Typography></Link>
                    
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.allMsgs}>
                    {[].map((msg, index) => <div key={index} className={classes.msg}>
                        <Fab color="primary" className={classes.fab}>
                            k
                        </Fab>
                        <Fab variant="extended" className={classes.fab}>
                            {msg.msg}
                        </Fab>
                    </div>)}

                </div>
                <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                    <SendBox className={classes.sendBox} />
                </AppBar>
            </main>
        </div>
    );
}

export default withRouter(MsgBox)