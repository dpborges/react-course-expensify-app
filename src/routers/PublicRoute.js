import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// This component, creates an instance of <Route />. Props are passed in via <PublicRoute> from AppRouter.
// then destructured below starting on the line with literal "PublicRoute". While destructing,
// we pull out isAuthenticated and component. {...rest} gets all other properties in props
// aside from the two: isAuthenticated and component. On the next line starting with <Route
// Note that all properties EXCEPT for isAuthenicated and component are passed to <Route />
// via {...rest}.
// Also note that we want to make sure all props passed to Route are passed to the 
// individual component. This is then followed with  a condition.
// If user is authenticated then we want to redirect to dashboard
// If user is not auththenticated redirect them to login page.
export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={ (props) => (
            isAuthenticated ? (
                <Redirect to="/dashboard" />
            ) : (
                <Component {...props} />
                
            )
        )
    }   />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid    // !! converts truthy or falsy value to boolean
});

export default connect(mapStateToProps)(PublicRoute);