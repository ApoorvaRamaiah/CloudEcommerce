import {configureStore} from '@reduxjs/toolkit';
import rootReducers from './reducer';
import authReducer from './reducer/authSlice';
import userReducer from './reducer/userSlice';
import handleCart from './reducer/handleCart';
const store = configureStore({
    reducer:{
        // rootReducers: handleCart,
        root: rootReducers,
        handleCart: handleCart,
        auth: authReducer,
        user: userReducer,
    }
})

export default store;
