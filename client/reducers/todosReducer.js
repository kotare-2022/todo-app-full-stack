import { createSlice } from "@reduxjs/toolkit"

import todosServices from "../services/todos"

const todoSlice = createSlice({
  name: 'todos',
  initialState: [], // <--- appropriate initial state
  reducers: {
    setTodos(state, action) {
      return action.payload
    },
    appendTodos(state, action) {
      // this will append to the state
      state.push(action.payload)
    },
  }
})

export const { setTodos, appendTodos } = todoSlice.actions

// THUNK, async action creators
export const initializeTodos = () => {
  return async (dispatch) => {
    const todos = await todosServices.getAllTodos() // [{...}, {...}, ...]
    dispatch(setTodos(todos))
    // todos.forEach(t => {
    //   dispatch(appendTodos(t)) // this changes the state
    // })
  }
}

export default todoSlice.reducer