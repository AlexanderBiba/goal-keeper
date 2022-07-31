import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        signIn(state, action) {
            state.user = action.payload;
        },
        signOut(state) {
            state.user = null;
        },
        setUserSettings(state, action) {
            state.user.settings = action.payload;
        }
    }
});

export const { signIn, signOut, setUserSettings } = userSlice.actions;

export default userSlice.reducer;