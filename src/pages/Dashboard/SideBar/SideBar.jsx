import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const SideBar = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [role, setRole] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/allEmployees/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
        });
    }
  }, [email]);

  console.log(role);
  return (
    <div>
      <div className="md:h-full h-[100vh] w-64 bg-gray-900">
        <div>
          <ul className="menu p-4 space-y-4">
            <li>
              <Link
                className="block py-2 px-4 rounded text-black bg-white hover:bg-white transition-colors"
                to="/"
              >
                Home
              </Link>
            </li>

            {role === "HR" && (
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
                    to="payment-history"
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
                    to="workSheet"
                  >
                    Work Sheet
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

          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
