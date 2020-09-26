import React from 'react';
import { Route, Redirect } from "react-router-dom";

const BeforeLogin = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/profile' />
    )} />
)

export default BeforeLogin;