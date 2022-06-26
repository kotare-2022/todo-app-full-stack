import React, { useState, useEffect } from 'react'

import Todos from './Todos'
import AddTodoForm from './AddToForm'

import todosServices from '../services/todos'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    todosServices.getAllTodos()
      .then(result => setTodos(result))   
  }, [])

  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <AddTodoForm />
      <Todos todos={todos}/>
    </div>
  )
}

export default App
