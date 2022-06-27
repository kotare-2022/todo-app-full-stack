import React, { useState, useEffect, useRef } from 'react'

import AddTodoForm from './AddToForm'
import Todos from './Todos'
import Toggleable from './Toggleable'

import todosServices from '../services/todos'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    todosServices.getAllTodos()
      .then(result => setTodos(result))   
  }, [])

  const addTodoFormRef = useRef()

  const tmpHandler = () => {
    addTodoFormRef.current.toggleVisibility()
  }

  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <button onClick={tmpHandler}>Click Me!</button>
      <Toggleable ref={addTodoFormRef} >
        <AddTodoForm />
      </Toggleable>
      <Todos todos={todos}/>
    </div>
  )
}

export default App
