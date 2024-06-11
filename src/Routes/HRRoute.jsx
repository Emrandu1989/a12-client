import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const HRRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      if (email) {
        const res = await fetch(
          `https://machine-world-server.vercel.app/allEmployees/${email}`
        );
        const data = await res.json();
        setRole(data[0]?.role);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchRole();
  }, [email]);

  useEffect(() => {
    const checkRole = async () => {
      if (!loading && role && role !== "HR") {
        console.log("You are not HR. Logging out...");

        await logOut();
        navigate("/login", { state: { from: location }, replace: true });
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

  return role === "HR" ? children : null;
};

export default HRRoute;
