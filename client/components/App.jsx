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
      <header><h1>Todo Application</h1></header>
      <div className="todos">
        {todos && todos.map(todo => {
          return (
            <div key={todo.id} className="todo">
              <div className="todo-header">{todo.title}</div>
              <div className="todo-description"><em>Description:</em> {todo.description}</div>
              <div className="todo-importance"><em>Importance:</em> {todo.importance_level_description}</div>
              <div className="todo-theme"><em>Theme:</em> {todo.theme_description}</div>
              <div className="todo-buttons">
                <button className="todo-update" type="submit">Update</button>
                <button className="todo-delete" type="submit">Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
