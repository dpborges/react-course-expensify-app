import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';
import { removeExpense } from '../actions/expenses';

// See AddExpensePageOrig.js first then the AddExpensePage.js compoment.
// What was done there is same process we took with EditExpensePage

// This component gets called by AppRouter for route /edit/:id   passing in id
// as prop called props.match.params.id.

const EditExpensePage = (props) => { 
    console.log('EXPENSE PAGE PROPS: ' , props);
    console.log('The ID: ' , props.match.params.id);
    return (
        <div>
            <ExpenseForm
                expense={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push("/");
                }}
            />
            
            <button 
                onClick={() => {
                    props.dispatch(removeExpense({ id: props.expense.id }));
                    props.history.push("/");
            }}>
                Remove Expense
            </button>
        </div>
    );
};

// Find the single expense we want to edit and pass via props to component
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
}

export default connect(mapStateToProps)(EditExpensePage);