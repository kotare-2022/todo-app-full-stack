import React, { useState, forwardRef, useImperativeHandle } from 'react'

function Toggleable(props, refs) {
  const [visibility, setVisibility] = useState(false)
  
  const displayWhenVisible = {display: visibility ? '' : 'none'}
  const displayWhenHidden = {display: visibility ? 'none' : ''}

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
      <div className="flex-center" style={displayWhenHidden}> 
        <button className="green-button" onClick={toggleVisibility}>{props.unhideName}</button>
      </div>
      <div style={displayWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default forwardRef(Toggleable) // <--- this is made possible here!