import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ContextProvider } from "./components/hooks/ContextApi.jsx";
import { ModalProvider } from "./components/ModalContext.jsx";
import { AppLayout } from "./AppLayout.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { NewsApi } from "./components/NewsApi.jsx";
import { ContactData } from "./pages/Contact.jsx";

const Home = lazy(() =>
  import("./pages/Home.jsx").then((m) => ({ default: m.Home })),
);
const Shop = lazy(() =>
  import("./pages/Shop.jsx").then((m) => ({ default: m.Shop })),
);
const About = lazy(() =>
  import("./pages/About.jsx").then((m) => ({ default: m.About })),
);
const Blog = lazy(() =>
  import("./pages/Blog.jsx").then((m) => ({ default: m.Blog })),
);
const Contact = lazy(() =>
  import("./pages/Contact.jsx").then((m) => ({ default: m.Contact })),
);
const Account = lazy(() =>
  import("./pages/Account.jsx").then((m) => ({ default: m.Account })),
);
const Company = lazy(() =>
  import("./pages/Company.jsx").then((m) => ({ default: m.Company })),
);
const ForwardRef = lazy(() =>
  import("./components/hooks/ForwardRef.jsx").then((m) => ({
    default: m.ForwardRef,
  })),
);
const DogsApi = lazy(() =>
  import("./components/hooks/DogsApi.jsx").then((m) => ({
    default: m.DogsApi,
  })),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
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
        loader: NewsApi,
      },
      {
        path: "contact",
        element: <Contact />,
        action :ContactData,
      },
      {
        path: "account",
        element: <Account />,
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
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <ModalProvider>
        <Suspense
          fallback={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ModalProvider>
    </ContextProvider>
  );
}

export default App;
