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
import { ContactForm } from './components/ContactForm.jsx'
import {ContactFormNew} from './components/ContactFormNew.jsx'
import Gallery from './components/Gallery.module.css';
import ButtonUi from './components/ButtonUi.module.css';
import { EventHandler } from './components/EventHanlder.jsx'
import { WelcomeMessage } from './components/EventHanlder.jsx'
import HeroBanner from "./components/HeroBanner.jsx";
import {ProductGallery} from "./components/ProductGallery.jsx";
import { EventPropogation } from './components/EventPropogation.jsx'
import { ArrayOfObjectState } from './components/ArrayOfObjectState.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ArrayOfObjectState/>
      {/* <EventPropogation/> */}
      {/* <Nav logoName="ShopEase" homeLink="/"/>
      <HeroBanner/>
      <ProductGallery name="New Arrivals" type="newArrival" />
      <ProductGallery name="Featured Products" type="featureProduct" /> */}
      {/* <Counter/> */}
      {/* <ContactForm/> */}
      {/* <ContactFormNew/> */}
      {/* <EventHandler/> */}
      {/* <WelcomeMessage Click={()=>handleClick('Welcome to the Event Handler!')} mouseEnter={ () => alert('Mouse Entered!')} style={{marginTop: '20px', padding: '10px', border: '1px solid black', display: 'inline-block', backgroundColor: 'lightgray'}} /> */}
    </>
  )
}

export default App
