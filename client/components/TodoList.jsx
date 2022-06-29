import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import Todo from './Todo'

export default function TodoList(props) {
  const todos = useSelector(globalState => globalState.todos)

  /*
  We have a Update form
  -- when we press the update button, we display the update form that is exclusive to the specific todo (within the div of "todo")
  -- when the when this form is displayed, the update and delete buttons disappear
  -- the form that pops up have pre-filled information of what the todo had within its contents
  -- when the update form is submitted, the form disappears
  */

  return (
  <div className="todos">
    {todos && todos.map(todo => {
      return (
        <Todo 
          key={todo.id} 
          id={todo.id}
          todo={todo} 
        />
      )
    })}
  </div>
  )
}