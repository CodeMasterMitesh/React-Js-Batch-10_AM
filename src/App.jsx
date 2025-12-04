import { useState } from 'react'
import { RouterProvider, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { About } from './pages/about.jsx'
import { Home } from './pages/Home.Jsx'
import { Contact } from './pages/Contact.jsx';
import { ForwardRef } from './components/hooks/forwardRef.jsx';
import { UseId } from './components/hooks/UseId.jsx';
import { PropsDrilling } from './components/hooks/PropsDrilling.jsx';
import { ContextProvider } from './components/hooks/ContextApi.jsx';
import Increment from './components/hooks/useReducer.jsx';
import { Company } from './pages/Company.jsx';
import Memo from './components/hooks/Memo.jsx';
import { UseMemo } from './components/hooks/UseMemo.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forwardref" element={<ForwardRef />} />
          <Route path="/useid" element={<UseId />} />
          <Route path="/propsdrilling" element={<PropsDrilling />} />
          <Route path="/increment" element={<Increment />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/usememo" element={<UseMemo />} />
        </Routes>
      </ContextProvider>
    </>
    
  )
}

export default App
