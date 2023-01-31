import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {}
  },
  reducers: {
    userLogin: (state, action) => {
      // state.value = action.payload
      console.log('login')
      // console.log(action)
      // console.log(state)
    },
    userLogout: (state) => {
      state.value = {}
    }
  }
})
export const selectConvertState = (state: any) => state.userSlice.value
export const { userLogin, userLogout } = userSlice.actions
export default userSlice.reducer
