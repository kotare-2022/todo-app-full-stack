import { configureStore } from "@reduxjs/toolkit"

// import the reducers
import todosReducer from "./reducers/todosReducer"
import themesReducer from "./reducers/themesReducer"
import importanceReducer from "./reducers/importanceReducer"

const store = configureStore({
  reducer: {
    todos: todosReducer,
    themes: themesReducer,
    importance: importanceReducer,
  }
})

export default store