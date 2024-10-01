import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: [],
  },
  reducers: {
    userCreate: (state, action: any) => {
        //payload updating to todoList. every time will get todo array
      state.userList = action?.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userCreate } = userSlice.actions

export default userSlice.reducer