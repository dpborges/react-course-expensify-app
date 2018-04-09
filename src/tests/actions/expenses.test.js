import  {addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({                        // toEqual compares properties of two objects
        type: 'REMOVE_EXPENSE',
        id:   '123abc'
    })
});



test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'recommend to others'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',                        // toEqual compares properties of two objects
        id:   '123abc',
        updates: { note: 'recommend to others'}
    })
});


test('should set up add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent', 
        note: 'this was last months rent',
        amount: '109500',  
        createdAt: 1000 
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',        
        expense: {
            ...expenseData,
            id: expect.any(String)     // Use any because uuid is dynamically generated
        }
    })
});


test('should set up add expense action object with default values', () => {
    const expenseData = {
        description: '', 
        note: '',
        amount: 0,  
        createdAt: 0
    }
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',        
        expense: {
            ...expenseData,
            id: expect.any(String)     // Use any because uuid is dynamically generated
        }
    })
});