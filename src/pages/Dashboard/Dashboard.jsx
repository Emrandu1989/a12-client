 
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
          <SideBar></SideBar>
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
