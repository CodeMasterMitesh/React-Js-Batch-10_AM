import { useState } from 'react'
import { RouterProvider, Routes, Route, createBrowserRouter } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { About } from './pages/about.jsx'
import { Home } from './pages/Home.Jsx'
import { Contact } from './pages/Contact.jsx';
import { Shop } from './pages/Shop.jsx';
import { Blog } from './pages/Blog.jsx';
import { ForwardRef } from './components/hooks/forwardRef.jsx';
import { UseId } from './components/hooks/UseId.jsx';
import { PropsDrilling } from './components/hooks/PropsDrilling.jsx';
import { ContextProvider } from './components/hooks/ContextApi.jsx';
import { Company } from './pages/Company.jsx';
import Memo from './components/hooks/Memo.jsx';
import { UseMemo } from './components/hooks/UseMemo.jsx';
import UseReducerHook from './components/hooks/useReducer.jsx';
import Counter from './components/redux/BasicExample.jsx';
import { AppLayout } from './AppLayout.jsx';
import { DogsApi } from './components/hooks/DogsApi.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "forwardRef",
        element: <ForwardRef />,
      },
      {
        path: "dogsapi",
        element: <DogsApi />,
      },
    ]
  },
 
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App

// {/* <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/company" element={<Company />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/forwardref" element={<ForwardRef />} />
//         <Route path="/useid" element={<UseId />} />
//         <Route path="/propsdrilling" element={<PropsDrilling />} />
//         <Route path="/usereducerhook" element={<UseReducerHook />} />
//         <Route path="/memo" element={<Memo />} />
//         <Route path="/usememo" element={<UseMemo />} />
//         <Route path="/counter" element={<Counter />} />
//       </Routes> */}