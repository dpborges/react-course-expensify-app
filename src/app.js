import React    from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // allows us to provide redux store to components
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import VisibleExpenses from './selectors/expenses';
import getVisibleExpenses from './selectors/expenses';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';


const store = configureStore();

// Code below was use to add some expenses and print visible expenses based on our selector
// store.dispatch(addExpense({ description: 'Water Bill', amount: 4500  }));
// store.dispatch(addExpense({ description: 'Gas Bill', amount: 0, createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

// Following lines of code ensures we only render application once and not once for 
// login and another time for logout.
let   hasRendered = false; 
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}


ReactDOM.render(<p>Loading.....</p>, document.getElementById('app'));

// Following function will be executed everytime authentication state changes, very much
// like a firebase subsrciber.
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(`logged in. UID is ${user.uid}`);
        store.dispatch(login(user.uid)); // call login action to save uid in store
        store.dispatch(startSetExpenses()).then(() => {
            // render application after fetching an array of expenses from firebase 
            // and using it to set state
            renderApp();    
            // Use history to get access to user's current "location"
            // This will also remain on same page upon page refresh
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        console.log(`logged out`);
        store.dispatch(logout()); // call logout action to clear uid from store
        renderApp();
        history.push('/');   // Brings user back, or redirects , to login page upon logout
    }
})



