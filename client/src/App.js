import React, {useEffect, useContext} from 'react';
import './App.css';
import showRoutes from './ultils/showRoutes';
import routes from './routes';
import jwt_decode from 'jwt-decode';
import {CTX} from './Store';
import {getCurrentUser} from './actions/auth.actions';
import setAuthHeader from './ultils/setAuthHeader';

function App() {
  const dispatchAuth = useContext(CTX).auth[1];
  useEffect(()=>{
    const token = localStorage.getItem('jwtToken');
    if(token){
    const decode = jwt_decode(token);
    const currentTime = Date.now()/1000;
    if(currentTime > decode.exp){
      localStorage.removeItem('jwtToken');
      window.location.href = '/'
    }else{
      setAuthHeader(token);
      getCurrentUser(dispatchAuth);
    }

}
  }, [])
  return (
      <div className="App">
        {showRoutes(routes)}
     </div>
  );
}

export default App;
