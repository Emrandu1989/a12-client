import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import ContactUs from "../pages/ContactUs/ContactUs";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllEmployeeList from "../pages/Dashboard/AllEmploeeList/AllEmploeeList";
import Dashboard from "../pages/Dashboard/Dashboard";
import Details from "../pages/Dashboard/Details/Details";
import EmployeeList from "../pages/Dashboard/EmployeeList/EmployeeList";
import EHostory from "../pages/Dashboard/EmployeePayHis/Hostory";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Progress from "../pages/Dashboard/Progress/Progress";
import Seemessage from "../pages/Dashboard/SeeMessage/Seemessage";
import WorkSheet from "../pages/Dashboard/WorkSheet/WorkSheet";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";
import HRRoute from "./HRRoute";
import PrivateRoute from "./PrivateRoute";

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
        path: "PaymentHisTory",
        element: (
          <EmployeeRoute>
            <EHostory />
          </EmployeeRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <HRRoute>
            <Progress />
          </HRRoute>
        ),
      },
      {
        path: "allEmploeeList",
        element: (
          <AdminRoute>
            <AllEmployeeList />
          </AdminRoute>
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
          fetch(
            `https://machine-world-server.vercel.app/allEmployee/${params.id}`
          ),
      },
    ],
  },
]);
export default router;
