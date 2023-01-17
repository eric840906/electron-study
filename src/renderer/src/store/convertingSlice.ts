import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const convertingSlice = createSlice({
  name: 'converting',
  initialState: {
    value: false
  },
  reducers: {
    converting: state => {
      state.value = true
    },
    convertDone: state => {
      state.value = false
    }
  }
})
export const selectConvertState = (state: any) => state.convertingReducer.value
export const { converting, convertDone } = convertingSlice.actions
export default convertingSlice.reducer as any
