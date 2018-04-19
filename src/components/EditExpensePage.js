import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense, startEditExpense  } from '../actions/expenses';


// See AddExpensePageOrig.js first then the AddExpensePage.js compoment.
// What was done there is same process we took with EditExpensePage

// This component gets called by AppRouter with route /edit/:id   passing in id
// as prop called props.match.params.id.
export class EditExpensePage extends React.Component  { 

    onSubmit =  (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push("/");
    };

    
    // console.log('The ID: ' , props.match.params.id);
    render() {
        // console.log('EXPENSE PAGE PROPS: ' , this.props);
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page_header__title">Edit Expenses</h1>
                    </div>
                </div>
                <div className="content-container">
                    <h1>Edit Expense </h1>
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                
                    <button 
                        onClick={this.onRemove}
                        className="button button--secondary"
                    >
                        Remove Expense
                    </button>
                </div>
            </div>
        );
    }
};

//Uses implicit return
const mapDispatchToProps = (dispatch, ownProps) => ({
    startEditExpense: (id, expense)  => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: ( data ) => dispatch(startRemoveExpense(data))
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