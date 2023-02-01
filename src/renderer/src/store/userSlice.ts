import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {}
  },
  reducers: {
    userLogin: (state, action) => {
      state.value = action.payload.data
    },
    userLogout: (state) => {
      console.log('logout')
      state.value = {}
    }
  }
})
export const selectUserState = (state: any) => state.userReducer.value
export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer
