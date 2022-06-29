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
    deleteTodo(state, action) {
      return state.filter(s => s.id !== action.payload)
    }
  }
})

export const { setTodos, appendTodos, deleteTodo } = todoSlice.actions

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

export const removeTodo = (id) => {
  return async dispatch => {
    // console.log(id)
    await todosServices.deleteTodoById(id)
    // console.log(id)
    dispatch(deleteTodo(id))
  }
}

export default todoSlice.reducer