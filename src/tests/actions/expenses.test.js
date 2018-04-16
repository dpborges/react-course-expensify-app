import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import  {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import  expenses from '../fixtures/expenses';
import { create } from 'domain';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({                        // toEqual compares properties of two objects
        type: 'REMOVE_EXPENSE',
        id:   '123abc'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'recommend to others'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',                        // toEqual compares properties of two objects
        id:   '123abc',
        updates: { note: 'recommend to others'}
    })
});

test('should set up add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',        
        expense: expenses[2]
    });    
});


test('should add expense to database and redux store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000, 
        note: 'This one is better',
        createdAt: 1000
    }
    
    store.dispatch(startAddExpense(expenseData)).then(() => {
       const actions = store.getActions();  // returns an array of actions from the mock store
       expect(actions[0]).toEqual({        // confirm event was dispatch by startAddExpense
           type: 'ADD_EXPENSE',
           expense: {
               id: expect.any(String),
               ...expenseData
           }
       });
       // Verify that expense was created in firebase database, which returns a promise
       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
               
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and redux store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0, 
        note: '',
        createdAt: 0
    }
    
    store.dispatch(startAddExpense({})).then(() => {
       const actions = store.getActions();  // returns an array of actions from the mock store
       expect(actions[0]).toEqual({        // confirm event was dispatch by startAddExpense
           type: 'ADD_EXPENSE',
           expense: {
               id: expect.any(String),
               ...expenseDefaults
           }
       });
       // Verify that expense was created in firebase database, which returns a promise
       return database.ref(`expenses/${actions[0].expense.id}`).once('value');
               
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});


test('should set up expense action object with  data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})


test('should fetch expenses from firebase', (done) => {
    // create mock store
    const store = createMockStore({});
    // go through process of dispatching startSetExpenses (which sets state.expenses to 
    // expenses fetched from firebase) and updating our mock store
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions(); // Take a look a the fake actions
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});