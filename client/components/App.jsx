import React, { useState, useEffect } from 'react'

import Todos from './Todos'

import { getAllTodos } from '../apiClient'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    getAllTodos()
      .then(result => setTodos(result))     
  }, [])

  const AddTodoForm = () => {
    
  }


  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <Todos todos={todos}/>
    </div>
  )
}

export default App
