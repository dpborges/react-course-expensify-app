import  { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// Store Creation
//  Note: line starting with window is used with redux dev tools only
export default () => {
    const store = createStore(
        combineReducers({
            expenses:   expensesReducer,
            filters:    filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

