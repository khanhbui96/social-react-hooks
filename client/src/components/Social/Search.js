import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {  Paper } from '@material-ui/core'
import { CTX } from '../../Store';
import Header from './Header';

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


function Search({match}) {
  const classes = useStyles();
  const [{loaded, search}] = useContext(CTX).search;
  return (
    <div className = {classes.box}>
      <Header/>
      {loaded&&<Paper className={classes.paper}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {search.login}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              <Button variant="contained" color="primary">Follow</Button>
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          {search.email}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Infor
        </Typography>
        <div>
          <Chip className={classes.chip} color="primary" label={`follower: ${search.followers.length}`} />
          <Chip className={classes.chip} color="secondary" label={`following: ${search.following.length}`} />
        </div>
      </div>
      </Paper>}
    </div>
  );
}
export default Search