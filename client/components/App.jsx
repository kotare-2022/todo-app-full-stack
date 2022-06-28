import React, { useState, useEffect, useRef } from 'react'

import AddTodoForm from './AddToForm'
import TodoList from './TodoList'
import Toggleable from './Toggleable'
import Filters from './Filters'

import todosServices from '../services/todos'
import themeServices from '../services/themes'
import importanceServices from '../services/importance'

function App() {
  const [todos, setTodos] = useState(null)
  const [themes, setThemes] = useState([])
  const [importanceLevels, setImportanceLevels] = useState([]) // <--- lifted state!

  useEffect(() => {
    const todoRequest = todosServices.getAllTodos()
    const themeRequest = themeServices.getAllThemes()
    const importanceRequest = importanceServices.getAllImportanceLevels()
    const promiseCollection = [todoRequest, themeRequest, importanceRequest]
    Promise.allSettled(promiseCollection)
      .then(result => {
        setTodos(result[0].value)
        setThemes(result[1].value)
        setImportanceLevels(result[2].value)
      })
  }, [])

  const addTodo = newTodo => {
    setTodos(todos.concat(newTodo))
  }

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
          themes={themes}
          importanceLevels={importanceLevels}
          visibilityToggler={tmpHandler}
          addTodo={addTodo}
        />
      </Toggleable>
      <Filters />
      <TodoList 
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default App
