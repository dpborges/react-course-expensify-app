import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import  { login, logout } from '../../actions/auth';

const createMockStore = configureMockStore([thunk]);


test('should generate login action object', () => {
    const store = createMockStore();  // create mock store
    const action = store.dispatch(login('123abc'));
    expect(action).toEqual({         
        type: 'LOGIN',
        uid:   '123abc'
    })
});


test('should generate logout action object', () => {
    const store = createMockStore();  // create mock store
    const action = store.dispatch(logout());
    expect(action).toEqual({         
        type: 'LOGOUT'
    })
});