import moment from 'moment';


// Get Visible Expenses - returns an array of expenses that has been sorted
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day')  : true ;
        const endDateMatch =  endDate ? endDate.isSameOrAfter(createdAtMoment, 'day')  : true ;
        // const textMatch = true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b ) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; 
        } 
        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1; 
        } 
    });
}

export default getVisibleExpenses;
