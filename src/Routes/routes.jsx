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
import Seemessage from "../pages/Dashboard/SeeMessage/Seemessage";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
import AdminRoute from "./AdminRoute";

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
          <HRRoute>
            <PaymentHistory />
          </HRRoute>
        ),
      },
      {
        path: "workSheet",
        element: (
          <EmployeeRoute>
            <WorkSheet />
          </EmployeeRoute>
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
        path: "SeeMessage",
        element: (
          <AdminRoute>
            <Seemessage />
          </AdminRoute>
        ),
      },
      {
        path: "allEmploeeList",
        element: (
          <HRRoute>
            <AllEmployeeList />
          </HRRoute>
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
