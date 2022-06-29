import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { removeTodo } from '../reducers/todosReducer'

import UpdateForm from './UpdateForm'

export default function Todo(props) {
  const todo = useSelector(globalState => {
    const todos = globalState.todos
    const id = props.id
    return todos.find(t => t.id === id)
  })
  // <--- for visibility
  const [toUpdate, setToUpdate] = useState(false) 

  const dispatch = useDispatch()

  const handleUpdate = () => {
    console.log('Update not yet implemented')
    setToUpdate(!toUpdate)
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