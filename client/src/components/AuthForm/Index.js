import React, { useState, useEffect, useContext } from 'react';
import './styles/SignInUp.css';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {signUpUser, signInUser} from '../../actions/auth.actions';
import {CTX} from '../../Store';
import {withRouter} from 'react-router-dom'

const styles = makeStyles({
  root:{
    display: "flex",
    justifyContent: "center",
    flexDirection:'column',
    alignItems: "center"
  },
  textField: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    width: "100%"
  }
})
const SignInUp = (props) => {
  const {history} = props;
  const [errs, dispatchErrs] = useContext(CTX).errs;
  const dispatchAuth = useContext(CTX).auth[1];
  const [status, setStatus] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true)
  const [user, setUser] = useState({
    email: '',
    login: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const classes = styles();

  useEffect(() => { setErrors(errs) }, [errs])
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  };
  const handleSubmit = e => {
    e.preventDefault();
   if(isSignIn){
     signInUser(user, history, dispatchErrs, dispatchAuth )
   }else{
    signUpUser(user, dispatchErrs, ()=>setStatus(!status));
 
   }
    
  }
  return (
    <div className={classes.root}>
      <h2>Sign in/up Form</h2>
      <div className={status ? "container" : "container right-panel-active"} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit} value='signUp'>
            <h1>Create Account</h1>
            <TextField
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              name='email'
              className={classes.textField}
              label="Email"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
            />
            <TextField
              onChange={handleChange}
              error={errors.login ? true : false}
              helperText={errors.login}
              name='login'
              className={classes.textField}
              label="Login"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
            />
            <TextField
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              name='password'
              type='password'
              className={classes.textField}
              label="Password"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
            />
            <TextField
              onChange={handleChange}
              error={errors.password2 ? true : false}
              helperText={errors.password2}
              name='password2'
              type='password'
              className={classes.textField}
              label="Password2"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
            />
            <button style={{ marginTop: 10 }} onClick={() => setIsSignIn(false)}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <TextField
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              name='email'
              className={classes.textField}
              label="Email"
              variant="outlined"
              value={user.email}
              id="mui-theme-provider-outlined-input"
            />
            <TextField
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              name='password'
              className={classes.textField}
              label="Password"
              type='password'
              variant="outlined"
              value={user.password}
              id="mui-theme-provider-outlined-input"
            />
            <button onClick={() => setIsSignIn(true)}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => { setErrors({}); setStatus(!status); }}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => { setErrors({}); setStatus(!status); }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

};


export default withRouter(SignInUp)