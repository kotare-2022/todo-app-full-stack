import React, { useState, useEffect } from 'react'

import Todos from './Todos'

import todosServices from '../services/todos'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    todosServices.getAllTodos()
      .then(result => setTodos(result))   
  }, [])

  const AddTodoForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [theme, setTheme] = useState([])
    const [importance, setImportance] = useState('')

    useEffect(() => {
    }, [])

    return (
      <form className="todo-form">
        <label htmlFor="title">Title:</label>
        <input 
          type="text" id="title" name="title" 
          value={title} onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input 
          type="text" id="description" name="description" 
          value={description} onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="theme">Choose a Theme:</label>
        <select name="theme" id="theme">
          
        </select>
      </form>
    )
  }


  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <AddTodoForm />
      <Todos todos={todos}/>
    </div>
  )
}

export default App
