import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import {Button} from '@material-ui/core'
import {SendSharp} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
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
});

export default function SendBox() {
  const classes = useStyles();
  const [text, changeText] = useState('');
  return (
    <div className={classes.root}>
      <InputBase
        multiline
        onChange={e=>changeText(e.target.value)}
        value={text}
        className={classes.input}
        placeholder="Type message ..."
      />
      <Divider className={classes.divider} />
      <Button   >
        < SendSharp />
        </Button>
    </div>
  );
}