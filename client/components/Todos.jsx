import React from 'react'

export default function Todos(props) {
  const todos = props.todos

  const handleUpdate = () => {
    console.log('Update not yet implemented')
  }

  const handleDelete = () => {
    console.log('Delete not yet implemented')
  }

  return (
  <div className="todos">
    {todos && todos.map(todo => {
      return (
        <div key={todo.id} className="todo">
          <div className="todo-header">{todo.title}</div>
          <div className="todo-description"><em>Description:</em> {todo.description}</div>
          <div className="todo-theme"><em>Theme:</em> {todo.theme_description}</div>
          <div className="todo-importance"><em>Importance:</em> {todo.importance_level_description}</div>
          <div className="todo-buttons">
            <button className="update" type="submit" onClick={handleUpdate}>Update</button>
            <button className="delete" type="submit" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )
    })}
  </div>
  )
}