import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut />,
      children:[
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
  ]);
  export default router