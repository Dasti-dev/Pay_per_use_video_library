import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
// import videoReducer from '../features/video/videoSlice';


export const store = configureStore({
    reducer : loginReducer,
});