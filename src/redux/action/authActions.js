    // authActions.js
    import { login, logout } from '../reducer/authSlice';
    import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase";
    // Initialize Firebase auth
    // const auth = getAuth(firebaseApp);

    const auth = getAuth();

    export const loginUser = (email, password) => async (dispatch) => {
    try {
        // Use Firebase to sign in the user with email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login success:', auth);

        // Dispatch the login action to the box
        dispatch(login());
    } catch (error) {
        // Handle login error (e.g., display an error message)
        console.error('Login error:', error.message);
    }
    };

    export const logoutUser = () => async (dispatch) => {
    try {
        // Use Firebase to sign out the user
        await signOut(auth);

        // Dispatch the logout action to the box
        dispatch(logout());
    } catch (error) {
        // Handle logout error (e.g., display an error message)
        console.error('Logout error:', error.message);
    }
    };
