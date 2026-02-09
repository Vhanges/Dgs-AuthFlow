import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Main from '../layout/Main';

const routes = [
    { path: '/home', element: <Home/>, useMainLayout: true}
]

export const RouteComponents = routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.useMainLayout ? <Main>{route.element}</Main> : route.element}/>
));