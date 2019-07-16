import React, {useEffect} from 'react';
import Header from './Header';
import Post from './Post';
import PostList from './PostList'
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

const styles = makeStyles({
    root:{
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const Home = (props)=>{
    const classes = styles();
    const {history} = props;
    useEffect(()=>{
        if(!localStorage.getItem('jwtToken')){
            history.push('/form')
        }
    })
    return (
        <div className={classes.root}>
            <Header />
            <Post/>
            <PostList/>
        </div>
        
        
    )
};


export default withRouter(Home)