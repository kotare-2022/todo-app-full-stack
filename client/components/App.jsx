import React, { useState, useEffect, useRef } from 'react'

import AddTodoForm from './AddToForm'
import Todos from './Todos'
import Toggleable from './Toggleable'
import Filters from './Filters'

import todosServices from '../services/todos'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    todosServices.getAllTodos()
      .then(result => setTodos(result))   
  }, [])

  const addTodo = newTodo => {
    setTodos(todos.concat(newTodo))
  }

  const deleteTodo = id => {
    // filters all but the one with id
    setTodos(todos.filter(t => {
      console.log(t.id, '  |||  ', id)
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
          addTodo={addTodo}
        />
      </Toggleable>
      <Filters />
      <Todos 
        todos={todos}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default App
