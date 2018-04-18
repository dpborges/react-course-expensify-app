import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory  from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute  from './PrivateRoute';

export const history = createHistory();

// <BrowserRouter> uses browser history by default. <BrowserRouter> allows you to 
// use history only on components registered as a route.  An alternative, you  
// can use <Router>, and pass in your own history as a prop. The main advantage
// is being to export history and using it in other files (eg  app.js), specifically, 
// those that are not registered as a route.
//
// Note that the <Route /> component that was replaced by <PrivateRoute> below, 
// now lives in PrivateRoute.js.  PrivateRoute.js renders a Route and receives 
// all parms below used PrivateRoute as props.
const AppRouter = () => (
    <Router history={history}>    
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;


