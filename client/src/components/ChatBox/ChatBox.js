import React, { useContext, useEffect, useState } from 'react';

import { getMsgsById } from '../../actions/msg.actions';
import { CTX } from '../../Store';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core'
import { SendSharp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {getCurrentUser} from '../../actions/auth.actions';
import Fab from '@material-ui/core/Fab';
import { Link, withRouter } from 'react-router-dom';
import { getUsers } from '../../actions/msg.actions';

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
        textTransform: "lowercase"
    },
    sendBox: {
        margin: 5,
        borderRadius: 10,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        background: '#3f51b5',
    },
    input: {
        marginLeft: 8,
        flex: 1,
        color: '#fff'
    },
    iconButton: {
        padding: 10,
        color: "#fff"
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
}));

function MsgBox(props) {
    const { container, match } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [text, changeText] = useState('');
    const [msgs, dispatchMsg] = useContext(CTX).msgs;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [{ users }, dispatchUsers] = useContext(CTX).users;
    const [{user}, dispatchAuth] = useContext(CTX).auth;
    const {sendMsg} = useContext(CTX);
    const [topic, changeTopic] = useState('');
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }
    useEffect(() => {
        getCurrentUser(dispatchAuth);
        getMsgsById(match.params.id, dispatchMsg);
        getUsers(dispatchUsers)
    }, [match.params.id])
    const drawer = (<div>
        <div className={classes.toolbar} style={{ color: "#fff", background: '#3f51b5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6"  >
                users
            </Typography>
        </div>
        <Divider />
        <List>
            {users.map((user, index) => (
                <Link key={user.login} to={`/chat/${user._id}`}><ListItem button  onClick = {e=>changeTopic(e.target.innerText)}  >
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
                        {topic}
                    </Typography>
                    <Link style={{ position: 'absolute', color: '#fff', top: 0, right: '4px' }} to='/home'><Typography variant="h6" noWrap >
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
                {msgs.map((msg, index) => <div key={index} className={classes.msg}>
                            {user&&user._id.toString()===msg.vs[0]&&<div style={{display: 'block', float: 'left', clear: 'both'}}><Fab variant="extended" color="secondary" className={classes.fab}>
                                        <h3>{msg.msg}</h3>
                                    </Fab></div>}
                            {user&&user._id.toString()!==msg.vs[0]&&<div style={{display: 'block', float: 'right', clear: 'both'}}><Fab variant="extended"  color="primary" className={classes.fab}>
                                        <h3>{msg.msg}</h3>
                                    </Fab></div>}
                    </div>)}

                </div>
                <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                    <div className={classes.sendBox}>
                        <InputBase
                            multiline
                            onChange={e => changeText(e.target.value)}
                            value={text}
                            className={classes.input}
                            placeholder="Type message ..."
                        />

                        <Divider className={classes.divider} />
                        <Button onClick={() => { sendMsg( {msg: text ,id: match.params.id}); changeText('') }} >
                            < SendSharp />
                        </Button>
                    </div>
                </AppBar>
            </main>
        </div>
    );
}

export default withRouter(MsgBox)