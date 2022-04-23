import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ Component, isAuth, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return (
                        <Component />
                    );
                }
                else {
                    return (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    );
                }
            }}
        />
    )
}

export default ProtectedRoute
