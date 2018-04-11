const selectExpensesTotal = (expenses) => {
    // Transform expense objects to an array of amount values only
    const amounts = expenses.map((expense) => expense.amount);

    // Calculate total
    const reducerFunction = (previousValue, currentValue) => (previousValue + currentValue);
    let total = amounts.reduce(reducerFunction,  0 );
    return total;

    // note that you can can use function chaining with arrays
    // I could have written map(---).reduce(----) right after the map expression to produce the same result.
    // map would have returned an array of numbers and that array would have been input to reduce.
};

export default selectExpensesTotal;

