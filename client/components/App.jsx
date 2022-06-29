import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import AddTodoForm from './AddToForm'
import TodoList from './TodoList'
import Toggleable from './Toggleable'
import Filters from './Filters'

import { initializeTodos } from '../reducers/todosReducer'
import { initializeThemes } from '../reducers/themesReducer'
import { initializeImportance } from '../reducers/importanceReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // initialize todos
    dispatch(initializeTodos())
    // initialize themes
    dispatch(initializeThemes())
    // initialize importanceLevels
    dispatch(initializeImportance())
  }, [])

  const updateTodo = (id, updatedTodo) => {
    // alter todo otherwise, is ok
    setTodos(todos.map(t => (t.id === id) ? updatedTodo : t))
  }

  const deleteTodo = id => {
    // filters all but the one with id
    setTodos(todos.filter(t => {
      return t.id !== id
    }))
  }

  // REFS
  const addTodoFormRef = useRef()

  const tmpHandler = () => {
    addTodoFormRef.current.toggleVisibility()
  }

  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <Toggleable ref={addTodoFormRef} unhideName={'Create Todo'}>
        <AddTodoForm 
          visibilityToggler={tmpHandler}
        />
      </Toggleable>
      <Filters />
      <TodoList 
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default App
