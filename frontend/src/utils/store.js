import { configureStore } from '@reduxjs/toolkit'
import applicationStateReducer from './reducer'

export default configureStore({
   reducer: {
       applicationState: applicationStateReducer
   },
})
