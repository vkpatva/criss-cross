import { useState } from 'react'
import './App.css'
import DiceRoller from './game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DiceRoller/>
    </>
  )
}

export default App
