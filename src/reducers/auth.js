

export default (state = {}, action) => {
    // when user logs in, we set uid on the state object.
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        // when user logs out, we set state to empty object
        case 'LOGOUT':
            return {}
        default:
            return state;
    }
};