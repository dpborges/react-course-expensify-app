import React    from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // allows us to provide redux store to components
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import VisibleExpenses from './selectors/expenses';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


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


ReactDOM.render(jsx, document.getElementById('app'));

