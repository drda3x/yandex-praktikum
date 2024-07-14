import { createSlice } from '@reduxjs/toolkit'

export const applicationState = createSlice({
    name: 'applicationState',
    initialState: {
        url: '/',
        lastAuthAction: null,
        userLoggedIn: false,
        userEmail: '',
        userAvatar: '',
        userName: '',
        userAbout: '',
        userId: '',
        newCard: null,
    },
    reducers: {
        moveTo: (state, action) => {
            state.url = action.payload
        },
        login: (state, action) => {
            state.userLoggedIn = true;
            state.userEmail = action.payload;
            state.lastAuthAction = 'login';
        },
        logout: (state) => {
            state.userLoggedIn = false;
            state.userEmail = ""
            state.lastAuthAction = 'logout';
        },
        setUserInfo: (state, action) => {
            let payload_map = {
                "avatar": "userAvatar",
                "name": "userName",
                "about": "userAbout",
                "_id": "userId"
            }
            for (let key in payload_map) {
                if (action.payload.hasOwnProperty(key)) {
                    state[payload_map[key]] = action.payload[key]
                }
            }
        },
        setUserAvatar: (state, action) => {
            console.log("set avatar", action);
            state.userAvatar = action.payload;
        },
        addCard: (state, action) => {
            console.log("add card reducer", action.payload);
            state.newCard = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const  appStateActions  = applicationState.actions

export default applicationState.reducer
