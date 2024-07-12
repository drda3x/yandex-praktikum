import { createSlice } from '@reduxjs/toolkit'

export const applicationState = createSlice({
    name: 'applicationState',
    initialState: {
        url: '/',
        userLoggedIn: false,
        userEmail: '',
        userAvatar: '',
        userName: '',
        userAbout: ''
    },
    reducers: {
        moveTo: (state, action) => {
            state.url = action.payload
        },
        login: (state, action) => {
            state.userLoggedIn = true;
            state.userEmail = action.payload;
        },
        logout: (state) => {
            state.userLoggedIn = false;
            state.userEmail = ""
        },
        setUserInfo: (state, action) => {
            state.userAvatar = action.userAvatar;
            state.userName = action.userName;
            state.userAbout = action.userAbout;
        }
    },
})

// Action creators are generated for each case reducer function
export const  appStateActions  = applicationState.actions

export default applicationState.reducer
