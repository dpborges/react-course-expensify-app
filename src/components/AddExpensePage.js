import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses'

// NOTE:  Be sure to read comments on the original AddExpensePage within AddExpenseOrig.js file.
// During lecture,  the component was converted from a functional component
// to a class component and an onSubmit function was added to the class. Below is the refactored component.
// Notice there is no call to dispatch in our component. The dispatch is within the MapDispatchToProps function
// which maps our dispatch to a function prop. 
// The last change made (for testing purposes) was to export the class, in order to test the unconnected version of
// the component.

export class AddExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.addExpense(expense);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Expense </h1>
                <ExpenseForm 
                    // Passes the function prop "onSubmit" to the ExpenseForm component. 
                    // Note, function prop expects an expense object to be passed. 
                    onSubmit={this.onSubmit}                         
                />
            </div>
        )
    }
}


// The goal of mapDispatchToProps is to return an object that Maps your dispatch call to a prop vs calling dispatch inline.
// This allows you to abstract away dispatch from the compoment itself.
// Instead of having following inline code:    props.dispatch(addExpense(expense))    
// in the onSubmit prop used to render ExpenseForm above, we create the mapDispatchToProps function and 
// use following:                              props.onSubmit(expense)
// See the BEFORE and AFTER changes noted in the props of the  <ExpenseForm /> compoment above.
const mapDispatchToProps = (dispatch) => ({
        addExpense: (expense)  => dispatch(addExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);