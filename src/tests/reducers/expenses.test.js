import expenses from '../fixtures/expenses';
import { setExpenses } from '../../actions/expenses';
import  expensesReducer  from '../../reducers/expenses';

test('should set expenses', () => {
    // create an action
    const action = { 
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    // Call the expenses reducer with the expenses in our fixtures data (to simulate 
    // current state) and action above.
    // Above action will set the state to array of one expense item specifed in the action
    const state = expensesReducer(expenses, action);
    // expect  state to have an array of one item (for expense[1])
    expect(state).toEqual([expenses[1]]);

});