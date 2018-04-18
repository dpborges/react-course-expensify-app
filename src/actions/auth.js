import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

// Use googleAuthProvider that was exported from firebase.js
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = (uid) => ({
    type: 'LOGOUT',
})



// Use googleAuthProvider that was exported from firebase.js
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};