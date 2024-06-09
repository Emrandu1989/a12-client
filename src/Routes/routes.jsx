import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import WorkSheet from "../pages/Dashboard/WorkSheet/WorkSheet";
import PrivateRoute from "./PrivateRoute";
import EmployeeList from "../pages/Dashboard/EmployeeList/EmployeeList";
import Details from "../pages/Dashboard/Details/Details";
import ContactUs from "../pages/ContactUs/ContactUs";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AllEmployeeList from "../pages/Dashboard/AllEmploeeList/AllEmploeeList";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "workSheet",
        element: (
          <PrivateRoute>
            <WorkSheet />
          </PrivateRoute>
        ),
      },
      {
        path: "employeeList",
        element: (
          <PrivateRoute>
     
              <EmployeeList />
    
          </PrivateRoute>
        ),
      },
      {
        path: "allEmploeeList",
        element: (
          <PrivateRoute>
     
              <AllEmployeeList />
    
          </PrivateRoute>
        ),
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allEmployee/${params.id}`),
      },
    ],
  },
]);
export default router;
