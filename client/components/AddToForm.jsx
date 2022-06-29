import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { addTodos } from '../reducers/todosReducer'

export default function AddTodoForm(props) {
  const [title, setTitle] = useState('') // control
  const [description, setDescription] = useState('') // control
  const [themeInput, setThemeInput] = useState('') // control
  const [importanceInput, setImportanceInput] = useState('') // contol
  const [isSubmitting, setIsSubmitting] = useState(false) // control


  useEffect(() => {
    // ohh shit it works lmao tf
    setThemeInput(props.themes[0] && props.themes[0].description)
    setImportanceInput(props.importance[0] && props.importance[0].description)
  }, [props.themes, props.importance]) // so stuff works!!! ugh

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    
    console.log(themeInput, props.themes)

    if (isSubmitting) {
      const newTodo = {
        title, description, 
        themeId: props.themes.find(t => {
          return t.description === themeInput
        }).id,
        importanceLevelId: props.importance.find(imp => { // fyi this has to be importance level
          return imp.description === importanceInput
        }).id
      }

      dispatch(addTodos(newTodo))
    }

    props.visibilityToggler() 
    // <--- hiding form after todo submission
  }

  return (
    <form className="todo-form" onSubmit={onSubmitHandler}>
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
        {props.themes.map(t => {
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
        {props.importance.map(imp => {
          // imp.id and imp.description
          const [key, descr] = [imp.id, imp.description]
          return <option key={key} value={descr}>{descr}</option>
        })}
      </select>
      <div className="todo-form-buttons">
        <button 
          className="cancel" type="submit"
          onClick={() => setIsSubmitting(false)}
        >
          Cancel Submission
        </button>
        <button 
          className="green-button" type="submit"
          onClick={() => setIsSubmitting(true)}
        >
          Submit Todo
        </button>
      </div>
    </form>
  )
}