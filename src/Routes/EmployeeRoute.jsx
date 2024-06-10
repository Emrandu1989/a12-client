import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const EmployeeRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (email) {
      fetch(`https://machine-world-server.vercel.app/allEmployees/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching role:", error);
          setError("Failed to fetch role information.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (!loading && role && role !== "Employee") {
      console.log("You are not an Employee. Logging out...");
      logOut().then(() => {
        navigate("/login", { state: { from: location }, replace: true });
      });
    }
  }, [role, loading, logOut, navigate, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return role === "Employee" ? children : null;
};

export default EmployeeRoute;
