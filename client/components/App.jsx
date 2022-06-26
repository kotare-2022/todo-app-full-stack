import React, { useState, useEffect } from 'react'

import { getAllTodos } from '../apiClient'

function App() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    getAllTodos()
      .then(result => setTodos(result))     
  }, [])

  return (
    <div className="main">
      <h1>Todo Application</h1>
      <ul>
        {todos && todos.map(todo => {
          
          return (
            <li key={todo.id}>
                <p>Title: {todo.title}</p>
                <p>Description: {todo.description}</p>
                <p>Importance: {todo.importance_level_description}</p>
                <p>Theme: {todo.theme_description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
