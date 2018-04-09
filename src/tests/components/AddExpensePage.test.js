import React from 'react';
import { shallow } from 'enzyme';
import {  AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// This section pulls out some code that we'll be using for multiple test cases, hence it will be
// considered global. See Global section of Jest documentation to more detail of supported global functions.
let addExpense, history, wrapper;
beforeEach(() => {
 // Since AddExpenesPage takes 2 props, we'll set them up in the next two lines down below
  addExpense = jest.fn();           // Use a spy for onSubmit
  history = { push: jest.fn() };  // Use a spy for push function (on the history object)
  // render component with shallow
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
})


test('should render AddExpensePage correctly', () => {
    // render component with shallow
    expect(wrapper).toMatchSnapshot();
});


test('should handle onSubmit', () => {
    // Find form and get the onSubmit function prop, then pass in an expense objec from fixtures array.
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])   
    // Ensure spies that were set up above get called with the correct information
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
    // expect(wrapper).toMatchSnapshot();
});