import { configureStore, combineReducers } from '@reduxjs/toolkit'
import convertingReducer from './convertingSlice'
const rootReducer = combineReducers({
  convertingReducer
})
const store = configureStore({
  reducer: rootReducer
})
export default store
