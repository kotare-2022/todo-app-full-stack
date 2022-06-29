import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import { Provider } from 'react-redux'

// then import the store
import store from './store'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App /> 
    </Provider>
  , document.getElementById('app'))
})
