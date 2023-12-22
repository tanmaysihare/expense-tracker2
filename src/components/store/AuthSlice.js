import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    isSignIn : true,
    isLoggedIn : !!localStorage.getItem('token'),
    userId: null,
    token: localStorage.getItem('token') || null,
    isEmailVerified: false,
    isProfileUpdated: false,
};
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        signupOn(state){
            state.isSignIn = false;
        },
        signupOff(state){
            state.isSignIn= true;
        },
        login(state,action){
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.userId = null;
            state.token = null;
        },
        emailVerification(state){
            state.isEmailVerified = true;
        },
        profileUpdate(state,action){
            state.isProfileUpdated = true;
            state.userId = action.payload.userId;
        },
        manualProfileUpdate(state){
            state.isProfileUpdated = false;
        },
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;