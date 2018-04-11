import moment from 'moment';
import selectExpensesTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses';



test('should return 0 if has no expenses', () => {
    const value = 0;
    expect(selectExpensesTotal([])).toBe(value);
});


test('should correctly add a single expense', () => {
    const value = expenses[0].amount;
    expect(selectExpensesTotal([expenses[0]])).toBe(value);
});


test('should return total if has expenses', () => {
    const value = 114195;
    expect(selectExpensesTotal(expenses)).toBe(value);
});