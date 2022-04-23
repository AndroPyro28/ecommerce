import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
function UnProtectedRoute({ Component, isAuth, ...rest }) {
    
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuth) {
                    return (
                        <Component />
                    );
                }
                else {
                    return (
                        <Redirect to={{ pathname: "/market/products", state: { from: props.location } }} />
                    );
                }
            }}
        />
    )
}

export default UnProtectedRoute
