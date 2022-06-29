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
    },
    replaceTodo(state, action) {
      const updatedTodo = action.payload.todo
      const id = action.payload.id
      return state.map(s => {
        return (s.id === id) ? updatedTodo : s // 
      })
    }
  }
})

export const { setTodos, appendTodos, deleteTodo, replaceTodo } = todoSlice.actions

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
    await todosServices.deleteTodoById(id)
    dispatch(deleteTodo(id))
  }
}

export const updateTodo = (id, data) => {
  return async dispatch => {
    const updatedTodo = await todosServices.updateTodoById(id, data)
    dispatch(replaceTodo({id, todo: updatedTodo}))
  }
}

export default todoSlice.reducer