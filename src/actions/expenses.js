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
// Note that actions have access to both dispatch (1st parm) and getState (2nd parm).
// This is used to obtain uid.
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        // Obtain uid from global redux store
        const uid = getState().auth.uid;
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
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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

// Function used by middleware redux-thunk
// This function takes id as an argument, removes expense from firebase
// and dispatches an action to update redux store.
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        // Obtain uid from global redux store
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            // dispatch action to update redux store
            dispatch(removeExpense({ id  }));
        });
    ;}
};



// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Function used by redux-thunk middleware.
// this function fetches updates an expense in firebase, and then dispatches action editExpense
// to update redux
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        // Obtain uid from global redux store
        const uid = getState().auth.uid;
        console.log('startEditExpense function; uid property is ', uid );
        // update expense in firebase
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));  // update redux store
        });
    };
};



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
    return (dispatch, getState) => {
        // Obtain uid from global redux store
        const uid = getState().auth.uid;
        // fetch data from firebase
        const expenses = [];
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            // parse data into an array
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // console.log('array from database ', expenses);
            // update redux store with data fetched from database
            dispatch(setExpenses(expenses));
        });
    ;}
};
