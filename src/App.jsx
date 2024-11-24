import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Contact from "./pages/contact/index.jsx";
import Book from "./pages/book/index.jsx";

import Home from "./components/Home/index.jsx";
import Register from "./pages/register/index.jsx";
import Login from "./pages/login/index.jsx";
import { fetchAccount } from "./components/service/apiService.jsx";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/account/accountSlide.jsx";
import { useDispatch, useSelector } from 'react-redux'
import Loading from "./Loading/index.jsx";
import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import AdminPage from "./pages/Admin/index.jsx";
import LayoutAdmin from "./components/Admin/LayoutAdmin.jsx";
import './styles/reset.scss'

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
};
// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith('/admin');
//   const user = useSelector(state => state.account.user);
//   const userRole = user.role;

//   return (
//     <div className='layout-app'>
//       {isAdminRoute && userRole === 'ADMIN' && <Header />}
//       {/* <Header /> */}
//       <Outlet />
//       {/* <Footer /> */}
//       {isAdminRoute && userRole === 'ADMIN' && <Footer />}

//     </div>
//   )
// }


const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const getAccount = async () => {

    if (window.location.pathname === '/login'  
      || window.location.pathname === '/register' 
      || window.location.pathname === '') return 

    const res = await fetchAccount()
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound/>,
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
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: 
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
     },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "book",
        element: <Book />,
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

  return (
    <>
      {isAuthenticated === true || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/' 
      ? 
        <RouterProvider router={router} />
      :
        <Loading/>
  }
  </>
  );
};

export default App;
