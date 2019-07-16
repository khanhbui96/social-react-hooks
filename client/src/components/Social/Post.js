import React, { useState, useContext } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {CTX} from '../../Store'
import {addPost, getPosts} from '../../actions/post.actions'

const styles = makeStyles((theme) => ({
    paper: {
        marginTop:20,
        padding: 10,
        width: "60vw"
    },
    textField: {
        width: "100%"
    },
    button: {
        width: "100%",
        margin: theme.spacing(1)
    }
}))
const Post = (props) => {
    const classes = styles();
    const [text, setText] = useState('');
    const dispatchPost = useContext(CTX).post[1];
    const handleChange = (e) => {
        setText(e.target.value)
    };
    const handleSubmit = e => {
        e.preventDefault();
        addPost({text}, dispatchPost);
        getPosts(dispatchPost)
        setText('')
      }
    return (<Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
            <TextField
                multiline
                rowsMax="4"
                label="What's is new?"
                className={classes.textField}
                onChange={handleChange}
                value={text}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}>Send</Button>
        </form>
    </Paper>
    )
};
export default Post