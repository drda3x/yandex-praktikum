import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './reducer'

export default configureStore({
   reducer: {
       navigator: navigationReducer
   },
})
