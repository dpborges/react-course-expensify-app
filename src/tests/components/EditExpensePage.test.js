import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
// IMPORTANT: Do import editExpense or removeExpense as these are being set up as spies
// import editExpense from '../../actions/expenses';
// import removeExpense from '../../actions/expenses';
import expenses from '../fixtures/expenses';

// Define variables globally.
let startEditExpense, startRemoveExpense, history, wrapper;

// Do following before each test case
beforeEach( () => {
    // set up props needed by EditExpensePage
    startEditExpense = jest.fn();             // Use a spy for onSubmit
    startRemoveExpense = jest.fn();           // Use a spy for onClick
    history = { push: jest.fn() };       // Use a spy for push function (on the history object)
    // render component with shallow
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense}
            expense={expenses[2]} 
            history={history} />
        );
}); 


test('should render EditExpensePage correctly', () => {
    // take snapshot
    expect(wrapper).toMatchSnapshot();
});


test('should handle onSubmit to edit expense', () => {
    // Find form and get the onSubmit function prop, then pass in an expense object from fixtures array.
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])   
    // Ensure spies that were set up above get called with the correct information
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
    // expect(wrapper).toMatchSnapshot();
});


test('should handle onClick to remove expense', () => {
    // Find form and get the onSubmit function prop, then pass in an expense object from fixtures array.
    // wrapper.find('button').prop('onClick')(expenses[2].id)   
     wrapper.find('button').simulate('click');
    // Ensure spies that were set up above get called with the correct information
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[2].id});
    // expect(wrapper).toMatchSnapshot();
});