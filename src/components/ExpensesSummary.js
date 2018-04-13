import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral' ;
import selectExpenses from '../selectors/expenses.js';
import selectExpensesTotal from '../selectors/expenses-total.js';


export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount ===1 ? 'expense' : 'expenses' ;
    const formattedExpensesTotal = numeral(expensesTotal / 100 ).format('$0,0.00');
    return (
        <div>
            <h2>
                Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}
            </h2>
        </div>
    );
};

const mapStateToProps = (state) => {    
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

// // Here state is retured as props then passed into ExpenseSummary component.
export default connect(mapStateToProps)(ExpensesSummary);   


