import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseForm with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});


test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();      // snapshot before making changes
    // see API reference in airbnb.io/enzyme for more info on simulate
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {   }
    });                    
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // snapshot after submitting form and gettnig error

});

test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {        // finds first input element
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});


test('should set note on textarea change', () => {
    const value = 'New note ';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {        // finds only textarea element
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});


test('should set amount with valid input ', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {        // finds 2nd input element
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input ', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {        // finds 2nd input element
        target: { value }
    });
    expect(wrapper.state('amount')).toBe("");
});

// This makes sure the onSubmitProp was called with a valid expense object
// Spies are fake functions; we can check, that at minium, these fake functions have been called
// While setting up your test, rather than have parent component pass in a prop, 
// you will be passing in a fake (or mock) function from your test case
// To see assertions used with Spys, take a look at the Jest expect documnetation
// The following are assertions that can be used with spies. 
//   toHaveBeenCalled()
//   toHaveBeenCalled(number)
//   toHaveBeenCalledWith(arg1, arg2, arg3, ....)
//   toHaveBeenLastCalledWith(arg1, arg2, arg3, ....)
test('should call onSubmit function prop for valid form submission', ()  => {
    const onSubmitSpy = jest.fn();    // Jest.fn() creates a new spy (or mock function)
    const wrapper = shallow(<ExpenseForm                //<= render form
                        expense={expenses[0]}            //<= with valid expense
                        onSubmit={onSubmitSpy}          //<= and pass onSubmit function just as 
                    />)   ;
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    // Note that fixture has id, but when we call onSubmit  we do not pass in an id.
    // To get around this, we pass in a copy of the orginal object, without the id
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
         description: expenses[0].description,
         amount: expenses[0].amount,
         note: expenses[0].note,
         createdAt: expenses[0].createdAt
    });  
});

test('should set new date on date change', () => {
    const now = moment();                        // Create new moment instance to pass to onDateChange
    const wrapper = shallow(<ExpenseForm />);    // render component
    // Below, we find single date picker to get one of its props in order to call it. 
    // Note that what comes back from ....prop('onDateChange') is the actual handler.
    // When it comes back, we pass in a moment instance.
    // See airbnb/enzyme docs for more info
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);                    
});



test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);    // render component
    // Note that what comes back from ....prop('onFocusChange') is the actual handler.
    // When it comes back, we pass it the expected parameter
    // See airbnb/enzyme docs for more info
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);                    
});
