import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    token : null,
    username : 'User1'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logIn: (state,action) => {
            state.isLoggedIn = true;
            state.token = action.payload.text;
            state.username = action.payload.name;
        },
        logOut: (state,action) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    }
})

export const {logIn,logOut} = loginSlice.actions;

export default loginSlice.reducer