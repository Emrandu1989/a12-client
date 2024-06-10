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
    const fetchRole = async () => {
      try {
        if (email) {
          const res = await fetch(
            `http://localhost:3000/allEmployees/${email}`
          );
          const data = await res.json();
          setRole(data[0]?.role);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        setError("Failed to fetch role information.");
        setLoading(false);
      }
    };
    fetchRole();
  }, [email]);

  useEffect(() => {
    const checkRole = async () => {
      if (!loading  && role !== "Employee") {
        console.log("You are not an Employee. Logging out...");
        try {
          await logOut();
          navigate("/login", { state: { from: location }, replace: true });
          console.log("not admin")
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    };
    checkRole();
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
