import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses'



// Note original state of AddExpensePage before setting up our test used the code flagged as "line BEFORE setting up test case".
// The problem was that although we can easily have dispatch replaced by spy, the function addExpense(expense), 
// within the dispatch, has been imported.
// The way around this, is to make use of connect's "mapDispatchToProps", which is the 2nd
// parameter of react's connect functon. See comments below on mapDispatchToProps function. 
const AddExpensePage = (props) => (     // Props is here to be able to pass dispatch
    <div>
        <h1>Add Expense </h1>
        <ExpenseForm 
            // Passes the function prop "onSubmit" to the ExpenseForm component. 
            // Note, function prop expects an expense object to be passed. 
            onSubmit={(expense) => {   
                //props.dispatch(addExpense(expense));    // this line was used BEFORE setting up test case
                props.onSubmit(expense);                  // this line was used AFTER  setting up test case in conjuction with 
                                                          // mapDispatchToProps
                //  push allows you to programmatically change pages. Argument should be a path or route
                props.history.push("/");      // Redirect using props.history from AppRouter available props
                                              // Note, this uses browser routing. It does not through a page refresh      
                                                   
            }}                        
        />
    </div>
);

// The goal of mapDispatchToProps is to return an object that Maps your dispatch call to a prop vs calling dispatch inline.
// This allows you to abstract away dispatch from the compoment itself.
// Instead of having following inline code:    props.dispatch(addExpense(expense))    
// in the onSubmit prop used to render ExpenseForm above, we create the mapDispatchToProps function and 
// use following:                              props.onSubmit(expense)
// See the BEFORE and AFTER changes noted in the props of the  <ExpenseForm /> compoment above.
const mapDispatchToProps = (dispatch) => ({
        onSubmit: (expense)  => dispatch(addExpense(expense))
});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);