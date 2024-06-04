import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import WorkSheet from "../pages/Dashboard/WorkSheet/WorkSheet";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children:[
          {
            path: '/',
            element:<Home/>
          },
          {
            path: '/signUp',
            element:<SignUp/>
          },
          {
            path: '/login',
            element:<Login/>
          },
      ]
    },

     {
       path:"dashboard",
       element: <Dashboard/>,
       children: [
           {
              path:"workSheet",
              element: <PrivateRoute>
                 <WorkSheet />
              </PrivateRoute>
           }
       ]
     }
  ]);
  export default router