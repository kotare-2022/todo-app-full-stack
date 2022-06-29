import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { removeTodo } from '../reducers/todosReducer'

import UpdateForm from './UpdateForm'

import todosServices from '../services/todos' 

export default function Todo(props) {
  const [toUpdate, setToUpdate] = useState(false) // <--- for visibility
  
  const dispatch = useDispatch()

  const todo = props.todo

  const handleUpdate = () => {
    console.log('Update not yet implemented')
    setToUpdate(!toUpdate)
  }

  const handleDelete = () => {
    todosServices.deleteTodoById(todo.id)
      .then(_ => {
        console.log('hello')
        props.deleteTodo(todo.id)
      })
  }

  return (
    <div className="todo">
      <div className="todo-header">{todo.title}</div>
      <div className="todo-description"><em>Description:</em> {todo.description}</div>
      <div className="todo-theme"><em>Theme:</em> {todo.themeDescription}</div>
      <div className="todo-importance"><em>Importance:</em> {todo.importanceLevelDescription}</div>
      {!toUpdate ? 
        <div className="todo-buttons">
          <button 
            className="update" 
            type="submit" 
            onClick={handleUpdate}
          >
            Update
          </button>
          <button 
            className="delete" 
            type="submit" 
            onClick={() => dispatch(removeTodo(todo.id))}
          >
            Delete
          </button>
        </div> :
        <UpdateForm 
          todo={todo} 
          toggleVisibility={handleUpdate}
          updateTodo={props.updateTodo}
        />
      }
    </div>    
  )
}