import moment from 'moment';
import filtersReducer from '../../reducers/filters';


// This is an event triggered by redux when you first load up your app.
// This is where your defaults would be used.

test('should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy:  'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')

    })
});

//  ......... other test cases were not included 