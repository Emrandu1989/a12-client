import { FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaUserAlt, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <>
              <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen hover:bg-green-600 text-blue-200 bg-violet-500">
        <ul className="menu p-4">
         
            <>
              <li>
                <NavLink to="/dashboard/workSheet">
                  <FaHome></FaHome>
                  WorkSheet
                </NavLink>{" "}
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>{" "}
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manages Items
                </NavLink>{" "}
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings{" "}
                </NavLink>{" "}
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <FaUserAlt></FaUserAlt>
                  All Users
                </NavLink>{" "}
              </li>
         
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink> 
              </li>
            </>
       

          {/* Shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/">
              <FaSearch></FaSearch>
              Menu
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>{" "}
          </li>
        </ul>
      </div>

      {/* dashboard content */}

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>   
        </>
    );
};

export default Dashboard;