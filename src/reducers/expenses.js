// Expenses Reducer
const expensesReducerDefaultState = []; // set default state
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];    // returns state changes to redux
        case 'REMOVE_EXPENSE':
            console.log(`remove expense action called with id ${action.id}`);
            return state.filter(({ id }) =>  id !==  action.id )
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,             // returns state changes to redux
                        ...action.updates       
                    }
                } else {
                    return expense;             // returns state changes to redux
                }
            })
        default: 
            return state;
    }
}

export default expensesReducer;