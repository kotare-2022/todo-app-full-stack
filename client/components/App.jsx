import React, { useState, useEffect } from 'react'

import Todos from './Todos'

import todosServices from '../services/todos'
import themeServices from '../services/themes'
import importanceServices from '../services/importance'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    todosServices.getAllTodos()
      .then(result => setTodos(result))   
  }, [])

  const AddTodoForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [theme, setTheme] = useState('')
    const [themes, setThemes] = useState([])
    const [importance, setImportance] = useState('')
    const [importanceLevels, setImportanceLevels] = useState([])

    useEffect(() => {
      const themeRequest = themeServices
        .getAllThemes()
      const importanceRequest = importanceServices
        .getAllImportanceLevels()
      Promise.allSettled([themeRequest, importanceRequest])
        .then(result => {
          setThemes(result[0].value) // first & second at collection
          setImportanceLevels(result[1].value)
        })
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
        <select 
          name="theme" id="theme" 
          value={theme} 
          onChange={e => setTheme(e.target.value)}
        >
          {themes.map(t => {
            // t.id and t.description
            const [key, descr] = [t.id, t.description]
            return <option key={key} value={descr}>{descr}</option>
          })}
        </select>
        <label htmlFor="importance_level">How important is this:</label>
        <select 
          name="importance_level" id="importance_level" 
          value={importance} 
          onChange={e => setImportance(e.target.value)}
        >
          {importanceLevels.map(imp => {
            // imp.id and imp.description
            const [key, descr] = [imp.id, imp.description]
            return <option key={key} value={descr}>{descr}</option>
          })}
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
