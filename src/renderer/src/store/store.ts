import { configureStore, combineReducers } from '@reduxjs/toolkit'
import convertingReducer from './convertingSlice'
import imageReducer from './imageSlice'

const rootReducer = combineReducers({
  convertingReducer,
  imageReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
