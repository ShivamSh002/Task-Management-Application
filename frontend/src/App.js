import React from 'react'
import RegisterAndLogin from './Components/RegisterAndLogin/RegisterAndLogin'
import { Route,  Routes } from 'react-router-dom'
import TaskManager from './Components/TaskManager/TaskManager'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <div><RegisterAndLogin/></div>}/>
      <Route path="/task" element={ <div><TaskManager/></div>}/>
   
    </Routes>
  )
}

export default App