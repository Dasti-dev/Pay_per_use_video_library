import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    // arr[landing,login,signup,main,wallet]
    navPage : 0,
}

export const pageSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setNav: (state,action) => {
            state.navPage = action.payload;
        },
    }
})