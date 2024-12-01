import { useState } from 'react'
import Navbar from './Components/Navbar'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
      MY UI
    </>
  )
}

export default App
