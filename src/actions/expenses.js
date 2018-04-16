import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// Function used by middleware redux-thunk
// this function takes expense data as an argument and returns a function that takes 
// dispatch as an argument while expense data is already been bound to the function.
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // the const below is using destructuring to assign properties of expenseData 
        // object to the individual fields. The fields are then used below to construct
        // the expense object.
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        // add expense to firebase
        return database.ref('expenses').push(expense).then((ref) => {
            // update redux store
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    ;}
};

// REMOVE_EXPENSE
export const removeExpense = ( { id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_EXPENSES; passes in array of all expenses in our fixture. This is called before
//              each test case to initiale expenses.
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});


// Function used by redux-thunk middleware.
// this function fetches data from firebase, parses data into an array, and dispatches
// SET_EXPENSES
export const startSetExpenses = () => {
    return (dispatch) => {
        // fetch data from firebase
        const expenses = [];
        return database.ref('expenses').once('value').then((snapshot) => {
            // parse data into an array
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            console.log('array from database ', expenses);
            // update redux store with data fetched from database
            dispatch(setExpenses(expenses));
        });
    ;}
};
