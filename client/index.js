import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

// consider use of routes from react-router-dom

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})
