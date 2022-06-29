import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { updateTodo } from '../reducers/todosReducer'

export default function UpdateForm(props) {
  // console.log(props.todo)
  const todo = props.todo // <--- yes
  const [title, setTitle] = useState(todo.title) // control
  const [description, setDescription] = useState(todo.description) // control
  const [themeInput, setThemeInput] = useState(todo.themeDescription) // control
  const [importanceInput, setImportanceInput] = useState(todo.importanceLevelDescription) // contol
  const [isUpdating, setIsUpdating] = useState(false)  // <--- this is for updating on backend

  const themes = useSelector(globalState => globalState.themes)
  const importance = useSelector(globalState => globalState.importance) 

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    if (isUpdating) {
      // this is where we send the information to the server
      // then this is where we also change the information from server
      // console.log()
      const updatedTodo = { // yea same as prior
        title, description, 
        themeId: themes.find(t => t.description === themeInput).id,
        importanceLevelId: importance.find(imp => imp.description === importanceInput).id
      }
      dispatch(updateTodo(todo.id, updatedTodo))
    }

    props.toggleVisibility()
  }

  return (
    <form className="todo-form-update" onSubmit={onSubmitHandler}>
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
        value={themeInput} 
        onChange={e => setThemeInput(e.target.value)}
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
        value={importanceInput} 
        onChange={e => setImportanceInput(e.target.value)}
      >
        {importance.map(imp => {
          // imp.id and imp.description
          const [key, descr] = [imp.id, imp.description]
          return <option key={key} value={descr}>{descr}</option>
        })}
      </select>
      <div className="todo-form-buttons">
        <button 
          className="red-button" type="submit"
          onClick={() => setIsUpdating(false)}
        >
          Cancel Update
        </button>
        <button 
          className="green-button" type="submit"
          onClick={() => setIsUpdating(true)}
        >
          Update Todo
        </button>
      </div>      
    </form>
  )
}