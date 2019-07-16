import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ThumbDown, ThumbUp } from '@material-ui/icons'


const useStyles = makeStyles({
  root: {
    width: 500,
    fontSize: 10,
  },
});

function Interactive(props) {
  const { post, interactive} = props;
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
        onClick={() => {setLike(likePost + 1);interactive(post._id, 'like')}}
        icon={<ThumbUp style={{ fontSize: 18 }} />}
      />
      <BottomNavigationAction 
        onClick={() => {setLove(lovePost + 1);interactive(post._id, 'love')}} 
        label={lovePost}
        icon={<FavoriteIcon style={{ fontSize: 18 }} />} />
      <BottomNavigationAction 
        onClick={() => {setDislike(dislikePost + 1);interactive(post._id, 'dislike')
      }} 
        label={dislikePost} 
        icon={<ThumbDown style={{ fontSize: 18 }} />} />
    </BottomNavigation>
  );
}
export default Interactive