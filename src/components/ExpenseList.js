import React from 'react';
import { connect } from 'react-redux';
import ExpenseListitem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// SEE LESSONS 100 - 101

//  F I R S T   R E A C T - R E D U X  C O N N E C T E D  C O M P O N E N T

// Steps to connecting component to redux
// Step 1:  set up redux store Provider in the root of your applcation (eg. app.js)
// Step 2:  Create HOC using connect function provided by react-redux
// Step 3:  Define things you want to get off the store using mapStateToProps
// Step 4:  Specify presentation component you want to connect the redux store with.


//This export used by test file and default export used by application.
// by doing this, you disconnnect from the store and you can pass in props in test cases
export const ExpenseList = (props) => (        
    <div>                                      
        <h1>Expense list</h1>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return   <ExpenseListitem  key={expense.id}  {...expense} />;
                })
            )
        }
    </div>
);

// ====================================================================================
//                            Final React-Redux Impl
// ====================================================================================
// Note, once you connected a component to a redux store, every time state changes,
// your component will be re-rendered.
// To understand how compoments are connected to redux, I strongly suggest uncommenting
// lines between the CODE BLOCK line in section 
// "First React-Redux Impl" then come back and look at this section showing 
// "Final React-Redux Imp", as it may make more sense. What was done was to separate
// the connect function and assign it to mapStateToProps, then passing that function
// in to connect instead of having it in-line as shown in "First React-Redux Impl".


// Version # 1 of mapStateToProps - return expenses with no filtering
// const mapStateToProps = (state) => {    // Step 3
//     // N/V pairs returned below will be used to pass in as props to presentation component
//     return {
//         expenses: state.expenses,
//         filters: state.filters
//     };
// }

// Version # 2 of mapStateToProps - 
// Renders filtered list by applying selectExpenses in  our selectors folder.
// This function effectively overrides current state. Instead of returning property
// from the application state tree, it returns a filtered list of one of the properties.
const mapStateToProps = (state) => {    // Step 3
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};



// Here state is retured as props then passed into ExpenseList component.
export default connect(mapStateToProps)(ExpenseList);    // Step 2 & 4

// ====================================================================================
//                            First React-Redux Impl
// ====================================================================================
// The ConnectedExpenseList below is used as Wrapper function for our component, 
// hence why we export ConnectedExpenseList instead of ExpenseList.
// The connect()function,  is a curry function which returns a function, and hence why 
// its called  a second time with presentation component.
// The Object returned from connect's first function parameter is an object of name/value
// pairs that gets passed as props to the connected presentation component.
// You can return an object with arbitrary name/value pairs (like your name: 'dan'), or you
// can return properties from your redux store, like expenses and filters.
// **********************  CODE BLOCK **********************
// const ConnectedExpenseList = connect((state) => {

//     // N/V pairs returned below get passed in as props to presentation component
//     return {
//         expenses: state.expenses
//     };

// })(ExpenseList);

// export default ConnectedExpenseList;
// **********************  CODE BLOCK **********************