import { createSlice } from "@reduxjs/toolkit"

import importanceServices from "../services/importance"

const importanceSlice = createSlice({
  name: 'importance',
  initialState: [],
  reducers: {
    setImportance(state, action) {
      return action.payload
    },
    appendImportance(state, action) {
      // state.push(action.payload) // destructive
      return state.concat(action.payload) // gerard
    }
  }
})

export const { setImportance, appendImportance } = importanceSlice.actions

export const initializeImportance = () => {
  return async (dispatch) => {
    const importance = await importanceServices.getAllImportanceLevels()
    dispatch(setImportance(importance))
  }
}

export default importanceSlice.reducer // <--- singular

