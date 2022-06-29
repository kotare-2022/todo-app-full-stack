import { createSlice } from "@reduxjs/toolkit"

import themesServices from '../services/themes'

const themesSlice = createSlice({
  name: 'themes',
  initialState: [],
  reducers: {
    setThemes(state, action) {
      return action.payload
    }, 
    appendThemes(state, action) {
      state.push(action.payload)
    }
  }
})

export const { appendThemes, setThemes } = themesSlice.actions

export const initializeThemes = () => {
  return async (dispatch) => {
    const themes = await themesServices.getAllThemes()
    dispatch(setThemes(themes))
  }
}

export default themesSlice.reducer // <--- signular!! for the store