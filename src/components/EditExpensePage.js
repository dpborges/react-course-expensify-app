import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';
import { removeExpense } from '../actions/expenses';

// See AddExpensePageOrig.js first then the AddExpensePage.js compoment.
// What was done there is same process we took with EditExpensePage

// This component gets called by AppRouter with route /edit/:id   passing in id
// as prop called props.match.params.id.
export class EditExpensePage extends React.Component  { 

    onSubmit =  (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };

    onRemove = () => {
        this.props.removeExpense({ id: this.props.expense.id });
        this.props.history.push("/");
    };

    // console.log('EXPENSE PAGE PROPS: ' , props);
    // console.log('The ID: ' , props.match.params.id);
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button 
                    onClick={this.onRemove}>
                    Remove
                </button>
            </div>
        );
    }
};

//Uses implicit return
const mapDispatchToProps = (dispatch, ownProps) => ({
    editExpense: (id, expense)  => dispatch(editExpense(id, expense)),
    removeExpense:( idObjectPassedInto_OnRemove ) => dispatch(removeExpense(idObjectPassedInto_OnRemove)),
});


//Uses explicit return
// Find the single expense we want to edit and pass via props to component
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);