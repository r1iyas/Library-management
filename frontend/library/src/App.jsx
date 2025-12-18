import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentReg from './components/StudentReg'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/Loginpage'
import StudentHome from './components/StudentHome'
import AdminHome from './components/AdminHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Loginpage/>} ></Route>
        <Route path='StudentReg' element={<StudentReg/>} ></Route>
        <Route path='StudentHome' element={<StudentHome/>}></Route>
        <Route path='AdminHome' element={<AdminHome/>}></Route>
      </Routes>
    </>
  )
}

export default App
