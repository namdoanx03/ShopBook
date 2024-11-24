import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from "./pages/contact/index.jsx";
import Book from "./pages/book/index.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/Footer/index.jsx";
import Footer from "./components/Header/index.jsx";
import Home from "./components/Home/index.jsx";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "book",
        element: <Book/>,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
  
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
         
  </>
  );
};

export default App;
