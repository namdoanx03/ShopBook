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
import { useEffect, useState } from "react";
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
import ManageUserPage from './pages/admin/user';
import ManageBookPage from './pages/admin/book';
import './styles/global.scss';
import OrderPage from './pages/order';
import HistoryPage from './pages/history';
import AdminOrderPage from "./pages/admin/order/index.jsx";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer/>
    </>
  );
};


const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {

    if (window.location.pathname === '/login'  
      || window.location.pathname === '/register' 
    ) 
    return 

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
        path: "book/:slug",
        element: <Book/>,
      },
      {
        path: "order",
        element:
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "history",
        element:
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        ,
      },

    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, element:
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
      },
      {
        path: "user",
        element:
          <ProtectedRoute>
            <ManageUserPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "book",
        element:
          <ProtectedRoute>
            <ManageBookPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "order",
        element:
          <ProtectedRoute>
            <AdminOrderPage />
          </ProtectedRoute>
        ,
      },
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
      {isLoading === false 
      || window.location.pathname === '/login' 
      || window.location.pathname === '/register' 
      || window.location.pathname === '/' 
      || window.location.pathname.startsWith('/book')
      ? 
        <RouterProvider router={router} />
      :
        <Loading/>
  }
  </>
  );
};

export default App;
