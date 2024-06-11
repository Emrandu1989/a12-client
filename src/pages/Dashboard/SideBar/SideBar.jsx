import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SideBar = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (email) {
          const response = await fetch(`http://localhost:3000/allEmployees/${email}`);
          const data = await response.json();
          setRole(data[0]?.role);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        Swal.fire("Error!", "An error occurred while fetching user role.", "error");
      }
    };

    fetchUserRole();
  }, [email]);

  console.log(role)

  return (
    <div>
      <div className="h-full min-h-[100vh] w-64 bg-gray-900">
        <div>
          <ul className="menu p-4 space-y-4">
            <div>
              <h1 className="capitalize text-white text-center my-3 text-2xl font-semibold">
                {role} Dashboard{" "}
              </h1>
            </div>
            <li>
              <Link
                className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                to="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="block capitalize py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                to="/dashboard"
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
                  >
                    Employee List
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="progress\"
                  >
                   Progress
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="payment-history"
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
                  >
                    Work Sheet
                  </Link>
                </li>
                
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="PaymentHisTory"
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
                  >
                    All Employee List
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                    to="SeeMessage"
                  >
                    Message's
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
