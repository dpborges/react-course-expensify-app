import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import moment from 'moment';
import { filters, altFilters} from '../fixtures/filters';



// Set up your global variables for all the dispatch functions and component wrapper.
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
// Note when rendering component to assign to wrapper, we pass a prop called filters. This
// prop would have been passed in by the mapStatetoProps function, but because component
// is not connected to redux, we have to supply that prop during testing. Same holds
// true for the mapDispatchToProp dispatch functions. Since those functions are disconnected,
// we set them up as spies.  In summary, should keep in mind that props can come from a 
// Parent compoment, from mapStateToProps, and from mapDispatch to Props. These all must
// be set up when rendering component below (to assign to wrapper).
beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test('should render expense filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should render expense filters with altFilters correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'Rent';
    wrapper.find('input').simulate('change', {       // When simulating, leave out the event object.
        target: { value }                            // Instead of passing "e.target.value", pass "target.value"   
    });
    // I am assuming that since we are disconnected from redux, we cannot check state changes (unless
    // updating local state). This is why we're aking an assertion about the function call below,
    // and not state
    expect(setTextFilter).toHaveBeenLastCalledWith(value);   
});

// Recall that the "sort by" action depends on state to have a filters object defined with filter values.
// Since we are not connected to store we need to set state ourselves using our fixture.
// Here we use, wrapper setProps function to set the local state.
test('should handle sort by date', () => {
    const value = 'date';                
    wrapper.setProps({                   
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {     // When simulating, leave out the event object.   
        target: { value }                           // Instead of passing "e.target.value", pass "target.value"   
    });
    // I am assuming that since we are disconnected from redux, we cannot check state changes (unless
    // updating local state). This is why we have an assertion about the function call, and not state
    expect(sortByDate).toHaveBeenLastCalledWith();   
});


test('should handle sort by amount change', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {     // When simulating, leave out the event object.   
        target: { value }                           // Instead of passing "e.target.value", pass "target.value"   
    });
    // I am assuming that since we are disconnected from redux, we cannot check state changes (unless
    // updating local state). This is why we're aking an assertion about the function call,
    // and not state
    expect(sortByAmount).toHaveBeenLastCalledWith();   
});


test('should handle date changes', () => {
    const startDate =   moment(0).add(4, 'years');
    const endDate =     moment(0).add(8, 'years');
    // the prop call returns the onDatesChange function, which is called with the start and end  date.
    // Simulate was not used as it only handles certain events like onClick and OnChange, but apparently not onSubmit
    // which is what is used here.
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate}); // calls function associated with event
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);  // ensures setStateDate function, within the event function above is called
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);      // ensures setEndDate function, within the event function above is called
})

// The prop call returns the onFocusChange function, which is called with the start and end  date.
// Simulate was not used as it only handles certain events like onClick and OnChange, but unlikely will no work with 3rd party component (DateRangePicker)
test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);         // toBe compares 2 strings  
});