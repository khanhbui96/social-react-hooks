import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {  Paper } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Header from './Header';
import { CTX } from '../../Store';
import { getProfile, followUser, unfollowUser } from '../../actions/profile.action';
import {getPostsById } from '../../actions/post.actions';
import Interactive from './Interactive';
import {getCurrentUser} from '../../actions/auth.actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop:20,
        padding: 10,
        width: "60vw"
  },
  box: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
    padding: 10,
    width: "60vw"
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));


function Profile({ match }) {
  const classes = useStyles();
  const [{loaded, profile}, dispatchProfile] = useContext(CTX).profile;
  const [{user}, dispatchAuth] = useContext(CTX).auth;
  const [{ posts}, dispatchPost] = useContext(CTX).post;
  const dispatchFollow = useContext(CTX).follow[1];
  const status = user&&user.following&&(user.following.indexOf(match.params.userId) !== -1);
  let [value, setValue] = useState(status);
  console.log(value)
  useEffect(() => {
    getCurrentUser(dispatchAuth);
    getProfile(match.params.userId, dispatchProfile);
    getPostsById(match.params.userId, dispatchPost);
    
    
  }, [])
  return (
    <div className={classes.box}>
      <Header />
      {loaded&&  <Paper className={classes.paper}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {profile.login}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
            <Button 
              onClick={()=>{
                  if(status){
                    unfollowUser(match.params.userId, dispatchFollow)
                  }else{
                    followUser(match.params.userId, dispatchFollow)
                  }
                  setValue(!value)
              }} 
              variant="contained" 
              color="primary"
              >{!value ? 'follow' : 'unfollow'}
            </Button>
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {profile.email}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Infor
        </Typography>
        <div>
          <Chip className={classes.chip} color="primary" label={`follower: ${profile.followers.length}`} />
          <Chip className={classes.chip} color="secondary" label={`following: ${profile.following.length}`} />
          <Chip className={classes.chip} label="Medium" label={`posts: ${posts.length}`} />
        </div>
      </div>
      </Paper>
      }
      <div >
      {posts.map((post, index) => {
        return <Paper key={index} className={classes.root}><Card className={classes.card} >
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {post.user.login.slice(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="Settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<Link to={`/user/${post.user._id}`} >{post.user.login}</Link>}
            subheader={(new Date(post.createAt)).toLocaleString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.text}
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Interactive post={post} />
          </CardContent>
        </Card>
        </Paper>
      })}
    </div>
    </div>
  );
}
export default Profile