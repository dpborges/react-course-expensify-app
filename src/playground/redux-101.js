import { createStore } from 'redux';

// Action generators - functions that return action objects

const incrementCount = ({incrementBy = 1} = {} ) => ({
    type: 'INCREMENT',
    incrementBy 
});
   
const decrementCount = ({decrementBy = 1} = {} ) => ({
    type: 'DECREMENT',
    decrementBy 
});

const setCount = ({count = 1} = {} ) => ({
    type: 'SET',
    count
});


const resetCount = ({count = 0} = {}) => ({
    type: 'RESET',
    count
});

// Reducers 
// 1. Reducers are pure functions. That is, output is determined by the input. 
//    (eg inputs can't use global variables), nor can it change an variable outside its scope (eg. global).
// 2. Never change stat or action directly. We should just return object with new state.
const countReducer = (state = {count: 0}, action ) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
             return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: action.count
            };
        default: 
            return state;
    }
}


// set up redux state container
const store = createStore(countReducer);

// get redux state object container and print to console
console.log('Intial state');
console.log(store.getState());

// Use this to unsubscribe; Note subscribe returns an unsubscribe function.
// Here we are using subscribe to print console everytime state changes
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
  });


console.log('Increment by 5');
// Define and dispatch action to update redux store
store.dispatch(incrementCount({incrementBy: 5}));

// Uncomment line below to Unsubscribe here
// unsubscribe(); 

console.log('Increment by 1');
// Define and dispatch action to update redux store
store.dispatch(incrementCount());

console.log('Decrement by 10');
// Define and dispatch action to update redux store
store.dispatch(decrementCount({ decrementBy: 10}));

console.log('Decrement by 1');
// Define and dispatch action to update redux store
store.dispatch(decrementCount());

console.log('reset count');
// Define and dispatch action to update redux store
// Simulate a setter for your redux store property. Define and dispatch action to update redux store
store.dispatch(resetCount());

console.log('Set count to 101');
// Simulate a setter for your redux store property. Define and dispatch action to update redux store
store.dispatch(setCount({count: 101}));

