import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        signIn(state, action) {
            state.user = action.payload;
        },
        signOut(state) {
            state.user = null;
        }
    }
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;