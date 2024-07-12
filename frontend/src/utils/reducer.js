import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
      value: '/',
    },
    reducers: {
        moveTo: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const  navigator  = navigationSlice.actions

export default navigationSlice.reducer
