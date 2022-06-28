import React, {useState, useEffect} from 'react'

import themeServices from '../services/themes'
import importanceServices from '../services/importance'

export default function Filters() {
  const [theme, setTheme] = useState('')
  const [themes, setThemes] = useState([])
  const [importance, setImportance] = useState('')
  const [importanceLevels, setImportanceLevels] = useState([]) 
  // <-- repeat from form

  useEffect(() => {
    const themeRequest = themeServices
      .getAllThemes()
    const importanceRequest = importanceServices
      .getAllImportanceLevels()
    Promise.allSettled([themeRequest, importanceRequest])
      .then(result => {
        setThemes(result[0].value) // first & second at collection
        setImportanceLevels(result[1].value)
      })
    // <--- repeat from form, like twice ffs
  }, [])

  return (
    <div className="filter-box">
      <label htmlFor="theme">Filter by Theme:</label>
      <select 
        name="theme" id="theme" 
        value={theme} 
        onChange={e => setTheme(e.target.value)}
      >
        {themes.map(t => {
          // t.id and t.description
          const [key, descr] = [t.id, t.description]
          return <option key={key} value={descr}>{descr}</option>
        })}        
      </select>      
      <label htmlFor="importance_level">Filter by Importance:</label>
      <select 
        name="importance_level" id="importance_level" 
        value={importance} 
        onChange={e => setImportance(e.target.value)}
      >
        {importanceLevels.map(imp => {
          // imp.id and imp.description
          const [key, descr] = [imp.id, imp.description]
          return <option key={key} value={descr}>{descr}</option>
        })}
      </select>      
    </div>
  )

}