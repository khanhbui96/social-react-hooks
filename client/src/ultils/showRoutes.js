import React from 'react';

import {BrowserRouter,Route, Switch} from 'react-router-dom';

const showRoutes = routes => {
    return <BrowserRouter>
        <Switch>
        {routes.map((route, index)=>{
        return <Route
            key={index}
            exact = {route.exact}
            path = {route.path}
            component = {route.component}
        />
        })}
        </Switch>
    </BrowserRouter>
};
export default showRoutes
