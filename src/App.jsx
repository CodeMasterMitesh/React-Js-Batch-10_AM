import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Mgs from './Notification.jsx'
import Nav from './components/Nav.jsx'
import Button from './components/ButtonUi.jsx'
import Hero from './components/Hero.jsx'
import Counter from './components/Counter.jsx'
import {RecactFragment, Text} from './components/RecactFragment.jsx'
import { ConditionLoop } from './components/ConditionLoops.jsx'
import {NewArrivalGallery,FeatureGallery} from './components/Gallery.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import {ContactFormNew} from './components/ContactFormNew.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Nav logoName="Airon Web Solution" homeLink="https://google.com"/>
      {/* <Counter/> */}
      {/* <NewArrivalGallery name="New Arrival Gallery"/>
      <FeatureGallery name="Feature Product Gallery"/> */}
      {/* <ContactForm/> */}
      <ContactFormNew/>
    </>
  )
}

export default App
