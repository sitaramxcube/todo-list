import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todoList',
  initialState: {
    todoList: [],
  },
  reducers: {
    todosCreate: (state, action: any) => {
        //payload updating to todoList. every time will get todo array
      state.todoList = JSON.parse(JSON.stringify(action?.payload));
    }
  },
})

// Action creators are generated for each case reducer function
export const { todosCreate } = todoSlice.actions

export default todoSlice.reducer