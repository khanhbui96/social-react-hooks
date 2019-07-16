import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import { CTX } from '../../Store';
import { setInteractive, getPosts } from '../../actions/post.actions'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    padding: 10,
    width: "60vw"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function PostList(props) {
  const classes = useStyles()
  const [{ posts }, dispatchPost ]= useContext(CTX).post;
  useEffect(()=>{
    getPosts(dispatchPost)}
    ,[])
  function Interactive(props) {
    const { post } = props;
    const { like, love, dislike } = post.interactive;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [likePost, setLike] = React.useState(like)
    const [lovePost, setLove] = React.useState(love)
    const [dislikePost, setDislike] = React.useState(dislike)
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label={likePost}
          onClick={() => {
            setInteractive(post._id, 'like', dispatchPost)
            if ((likePost + lovePost + dislikePost) === 0) {
              setLike(likePost + 1);
            }
          }}
          icon={<ThumbUp style={{ fontSize: 18 }} />}
        />
        <BottomNavigationAction
          onClick={() => {
            setInteractive(post._id, 'love', dispatchPost)
            if ((likePost + lovePost + dislikePost) === 0) {
              setLove(lovePost + 1)
            }
          }}
          label={lovePost}
          icon={<FavoriteIcon style={{ fontSize: 18 }} />} />
        <BottomNavigationAction
          onClick={() => {
            setInteractive(post._id, 'dislike', dispatchPost)
            if ((likePost + lovePost + dislikePost) === 0) {
              setDislike(dislikePost + 1)
            }
          }}
          label={dislikePost}
          icon={<ThumbDown style={{ fontSize: 18 }} />} />
      </BottomNavigation>
    );
  }
  return (
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
              <h3>{post.text}</h3>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Interactive post={post} />
          </CardContent>
        </Card>
        </Paper>
      })}
    </div>
  );
};

export default PostList