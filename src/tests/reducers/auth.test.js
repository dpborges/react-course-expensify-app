import  authReducer  from '../../reducers/auth';

test('should update state with uid passed in with login action ', () => {
    const uid = '123abc';
    // create an action
    const action = { 
        type: 'LOGIN',
        uid
    };
    // Call the auth reducer with above action, which will tack on the uid to the state obj
    const state = authReducer({}, action);
    // expect  state to have an object with uid above
    expect(state).toEqual({uid});
});


test('should remover uid from state upon call to auth reducer w/ logout action ', () => {
    const uid = '123abc';
    // create an action
    const action = { 
        type: 'LOGOUT'
    };
    // Call the auth reducer with above action, which will clear uid from the state obj
    const state = authReducer({}, action);
    // expect  state to have an empty object 
    expect(state).toEqual({});
});