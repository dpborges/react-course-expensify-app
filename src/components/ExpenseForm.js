import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
// Fort testing purpose, the import below was moved to app.js
// MOVED to App.js ==> import 'react-dates/lib/css/_datepicker.css';


// Goal is to keep track of local state for all of the inputs. Only when form is sumbitted
// do we want to submit change to redux store. That submission is handled by parent component.
// The form here is simply responsible for presenting the form, validating inputs, saving data in 
// local state, and passing data to function prop for dispatch. As you may notice, there is
// is no connect() function imported for this component, therefore it cannot connect to redux.

export default class ExpenseForm extends React. Component {
    constructor(props) {
        super(props);
    
        // local component state
        this.state = {
            description: props.expense ? props.expense.description : '',
            note:     props.expense ? props.expense.note : '',
            amount:   props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt:  props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    // Be aware that "e.target.value" cannot be used in the callback inside this.setState()
    // You may used e.persist() instead of the assignment line before setState()
    onDescriptionChange = (e) => {
        const description = e.target.value;     // assign input value to description; allows to use object shorthand on next line
        this.setState(() => ({ description })); // update description on local state using ES6 shorthand
    };

    onNoteChange = (e) => {
        const note = e.target.value;     // assign input value to description; allows to use object shorthand on next line
        this.setState(() => ({ note })); // update description on local state using ES6 shorthand
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onDateChange = (createdAt) => { 
        if  (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));    
    };

    // Note: this local onSubmit method does validation but does not dispatch the 
    //       action (eg add or edit). The dispatch is done by the onSubmit method
    //       passed in as a function prop, from the AddExpensePage. That function prop
    //       is called (this.props.onSubmit) with data needed, then action is dispatched
    //       in the parent component (AddExpensePage).
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount'}))
        } else {
            this.setState(() => ({ error: ''}))
            // Call "function prop" passed in from AddExpensePage.js
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, // convert text to number
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };
    
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    onChange={this.onDescriptionChange}  // change the state.description value
                    value={this.state.description}    // render component with value from state object
                />
                <input 
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false }
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    onChange={this.onNoteChange}    // change the state.description value
                    value={this.state.note}         // render component with value from state object
                >
                </textarea>
                <div>
                  <button className="button">Save Expense</button> 
                </div>
            </form>
        )
    }
}