import { login, logout } from '../reducer/authSlice';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase";
// Initialize Firebase auth
// const auth = getAuth(firebaseApp);

const auth = getAuth();

export const loginUser = (email, password) => async (dispatch) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login success:', auth);

        dispatch(login());
    } catch (error) {
        console.error('Login error:', error.message);
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await signOut(auth);

        dispatch(logout());
    } catch (error) {
        console.error('Logout error:', error.message);
    }
};
