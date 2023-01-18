import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    value: []
  },
  reducers: {
    addFiles: (state, action) => {
      state.value = action.payload
    },
    clearFiles: state => {
      state.value = []
    }
  }
})
export const selectImageState = (state: any) => state.imageReducer.value
export const { addFiles, clearFiles } = imageSlice.actions
export default imageSlice.reducer
