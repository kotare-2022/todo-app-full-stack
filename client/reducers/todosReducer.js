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
  return async dispatch => {
    const todos = await todosServices.getAllTodos() // [{...}, {...}, ...]
    dispatch(setTodos(todos))
  }
}

export const addTodos = (newTodo) => {
  return async dispatch => {
    // returns added todo in full (with importance and theme)
    console.log(newTodo)
    const addTodo = await todosServices.addTodo(newTodo)
    dispatch(appendTodos(addTodo))
  }
}

export default todoSlice.reducer