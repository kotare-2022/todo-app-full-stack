import React from 'react'

import todosServices from '../services/todos' 

export default function Todos(props) {
  const todos = props.todos

  const handleUpdate = () => {
    console.log('Update not yet implemented')
  }

  const handleDelete = id => {
    // console.log('Delete not yet implemented')
    return () => {
      todosServices.deleteTodoById(id)
        .then(_ => {
          console.log('hello')
          props.deleteTodo(id)
        })
        // .catch(err => {
        //   console.log(err)
        // })
    }
  }

  return (
  <div className="todos">
    {todos && todos.map(todo => {
      return (
        <div key={todo.id} className="todo">
          <div className="todo-header">{todo.title}</div>
          <div className="todo-description"><em>Description:</em> {todo.description}</div>
          <div className="todo-theme"><em>Theme:</em> {todo.themeDescription}</div>
          <div className="todo-importance"><em>Importance:</em> {todo.importanceLevelDescription}</div>
          <div className="todo-buttons">
            <button className="update" type="submit" onClick={handleUpdate}>Update</button>
            <button className="delete" type="submit" onClick={handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      )
    })}
  </div>
  )
}