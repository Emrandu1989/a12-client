import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
 
import useAuth from "../../../hooks/useAuth";

const SideBar = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (email) {
        const response = await fetch(
          `https://machine-world-server.vercel.app/allEmployees/${email}`
        );
        const data = await response.json();
        setRole(data[0]?.role);
      }
    };

    fetchUserRole();
  }, [email]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`h-full min-h-[100vh] w-64 bg-gray-900 fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:relative sm:translate-x-0 z-40`}
      >
        <div className="relative">
          <ul className="menu p-4 space-y-4">
            <div>
              <h1 className="capitalize text-white text-center my-3 text-2xl font-semibold md:mt-0 mt-20">
                {role} Dashboard{" "}
              </h1>
            </div>
            <li>
              <Link
                className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                to="/"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block capitalize py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                to="/dashboard"
                onClick={toggleSidebar}
              >
                {role} Home
              </Link>
            </li>

            {role === "HR" && (
              <>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="employeeList"
                    onClick={toggleSidebar}
                  >
                    Employee List
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="progress"
                    onClick={toggleSidebar}
                  >
                    Progress
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="payment-history"
                    onClick={toggleSidebar}
                  >
                    Payment History
                  </Link>
                </li>
              </>
            )}
            {role === "Employee" && (
              <>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="workSheet"
                    onClick={toggleSidebar}
                  >
                    Work Sheet
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="PaymentHisTory"
                    onClick={toggleSidebar}
                  >
                    Payment History
                  </Link>
                </li>
              </>
            )}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="allEmploeeList"
                    onClick={toggleSidebar}
                  >
                    All Employee List
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="SeeMessage"
                    onClick={toggleSidebar}
                  >
                    Message's
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <button
        className="sm:hidden fixed top-4 left-4 p-2 bg-red-900 text-white rounded z-50 my-5"
        onClick={toggleSidebar}
      >
        {isOpen ? "X" : <FaBars />}
      </button>
    </div>
  );
};

export default SideBar;
