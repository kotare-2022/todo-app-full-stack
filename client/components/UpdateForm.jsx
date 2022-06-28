import React, {useState, useEffect} from 'react'

import todosServices from '../services/todos'
import themeServices from '../services/themes'
import importanceServices from '../services/importance'

export default function UpdateForm(props) {
  // FFS this is where the form is gonna go
  const todo = props.todo
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)  
  const [theme, setTheme] = useState(todo.themeDescription)
  const [themes, setThemes] = useState([])
  const [importance, setImportance] = useState(todo.importanceLevelDescription)
  const [importanceLevels, setImportanceLevels] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)  // <--- this is for updating on backend

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
  }, []) // bruh-ied and pasted

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log('Add todo handler not yet implemented')
    
    if (isUpdating) {
      // this is where we send the information to the server
      // then this is where we also change the information from server
      const updatedTodo = { // yea same as prior
        title, description, 
        themeId: themes.find(t => t.description === theme).id,
        importanceLevelId: importanceLevels.find(imp => imp.description === importance).id
      }
      todosServices.updateTodoById(todo.id, updatedTodo)
        .then(result => {
          // result is a full todo object that has been added
          // -- plus already joined!
          props.updateTodo(todo.id, result)
        })
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