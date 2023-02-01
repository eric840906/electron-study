import { configureStore, combineReducers } from '@reduxjs/toolkit'
import convertingReducer from './convertingSlice'
import userReducer from './userSlice'
const rootReducer = combineReducers({
  convertingReducer,
  userReducer
})
const store = configureStore({
  reducer: rootReducer
})
export default store
