import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ContextProvider } from "./components/hooks/ContextApi.jsx";
import { ModalProvider } from "./components/ModalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AppLayout } from "./AppLayout.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { NewsApi } from "./components/NewsApi.jsx";
import { ContactData } from "./pages/Contact.jsx";
import { AdminLogin } from "./pages/admin/AdminLogin.jsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";

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
const Cart = lazy(() =>
  import("./pages/Cart.jsx").then((m) => ({ default: m })),
);
const Checkout = lazy(() =>
  import("./pages/Checkout.jsx").then((m) => ({ default: m })),
);
const ProductDetail = lazy(() =>
  import("./pages/ProductDetail.jsx").then((m) => ({ default: m })),
);
const Register = lazy(() =>
  import("./pages/Register.jsx").then((m) => ({ default: m })),
);
const LoginPage = lazy(() =>
  import("./pages/Login.jsx").then((m) => ({ default: m })),
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
        path: "product/:productId",
        element: <ProductDetail />,
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
        action: ContactData,
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
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
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
  // Customer Auth Routes
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  
  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute adminOnly>
        <div style={{padding: '2rem'}}>Products Management - Coming Soon</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <ProtectedRoute adminOnly>
        <div style={{padding: '2rem'}}>Categories Management - Coming Soon</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <ProtectedRoute adminOnly>
        <div style={{padding: '2rem'}}>Blogs Management - Coming Soon</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute adminOnly>
        <div style={{padding: '2rem'}}>Orders Management - Coming Soon</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute adminOnly>
        <div style={{padding: '2rem'}}>Website Settings - Coming Soon</div>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
