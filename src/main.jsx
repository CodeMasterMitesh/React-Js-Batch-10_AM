import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/style.css'
// import './index.css'
import App from './App.jsx'
import Mgs from './Notification.jsx'
import Nav from './components/Nav.jsx'
import Button from './components/ButtonUi.jsx'
import Hero from './components/Hero.jsx'
import Counter from './components/Counter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    {/* <Nav logoName = "ReactApplication" homeLink = "https://google.com"/> */}
    {/* <Mgs msg="Hello Mitesh. Today Navratri Pass Information" />
    <Mgs msg="Hello Mitesh. Good Evening" />
    <Button href="https://google.com" value="Submit Btn"/> */}
    {/* <Hero/> */}
    <Counter/>
  </StrictMode>,
)
