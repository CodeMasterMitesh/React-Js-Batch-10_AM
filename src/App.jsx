import { useState } from 'react'
import { RouterProvider, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { About } from './pages/about.jsx'
import { Home } from './pages/Home.Jsx'
import { Contact } from './pages/Contact.jsx';
import { ForwardRef } from './components/hooks/forwardRef.jsx';
import { UseId } from './components/hooks/UseId.jsx';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forwardref" element={<ForwardRef />} />
        <Route path="/useid" element={<UseId />} />
      </Routes>
    </>
  )
}

export default App
