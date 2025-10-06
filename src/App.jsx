import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mgs from './Notification.jsx'
import Nav from './components/Nav.jsx'
import Button from './components/ButtonUi.jsx'
import Hero from './components/Hero.jsx'
import Counter from './components/Counter.jsx'
import {RecactFragment, Text} from './components/RecactFragment.jsx'
import { ConditionLoop } from './components/ConditionLoops.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* <Nav/>
    <Hero/>
    <Counter/> */}
    {/* <RecactFragment/> */}
    {/* <Text name="Chirag" education="B.TECH" PassingYear="2022" /> */}
    <ConditionLoop/>
    </>
  )
}

export default App
