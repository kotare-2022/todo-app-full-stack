import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import AddTodoForm from './AddToForm'
import TodoList from './TodoList'
import Toggleable from './Toggleable'
import Filters from './Filters'

import { initializeTodos } from '../reducers/todosReducer'
import { initializeThemes } from '../reducers/themesReducer'
import { initializeImportance } from '../reducers/importanceReducer'

function App() {
  const themes = useSelector(globalState => {
    console.log(globalState.themes)
    return globalState.themes
  })
  const importance = useSelector(globalState => {
    return globalState.importance
  })
  const dispatch = useDispatch()

  useEffect(() => {
    // initialize todos
    dispatch(initializeTodos())
    // initialize themes
    dispatch(initializeThemes())
    // initialize importance
    dispatch(initializeImportance())
  }, [])

  // REFS
  const addTodoFormRef = useRef()

  const visibilityToggler = () => {
    addTodoFormRef.current.toggleVisibility()
  }

  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <Toggleable ref={addTodoFormRef} unhideName={'Create Todo'}>
        <AddTodoForm 
          visibilityToggler={visibilityToggler}
          themes={themes} 
          importance={importance}
        />
      </Toggleable>
      <Filters themes={themes} importance={importance}/>
      <TodoList />
    </div>
  )
}

export default App
