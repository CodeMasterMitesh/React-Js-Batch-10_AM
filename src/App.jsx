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
import { ErrorPage } from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement : <ErrorPage/>,
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
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App