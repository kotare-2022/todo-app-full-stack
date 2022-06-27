import React, { useState, forwardRef, useImperativeHandle } from 'react'

function Toggleable(props, refs) {
  const [visibility, setVisibility] = useState(false)
  
  const displayWhenVisible = {display: visibility ? '' : 'none'}
  const displayWhenHidden = {display: visibility ? 'none' : ''}

  // toggling of visibility dependent on the button that is pressed
  // there is a div container is shown when visible === true
  // {props.children} // <--- forward refs // this is where we would want to display the form itself
  // -- the form itself will have a cancel button that when pressed, toggles the visibility of the form itself! Therefore refs are required
  // -- within these divs, there is a button that displays the form
  // there is a div container is shown when visible === false
  // -- this is where we would want to display a single button instead of the form
  // -- where the form will just say, `createTodo`

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility, // <--- linked to refs
    }
  })

  return (
    <div>
      <div style={displayWhenHidden}> 
        <button onClick={toggleVisibility}>{props.unhideName}</button>
      </div>
      <div style={displayWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default forwardRef(Toggleable)