import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
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
      if (!loading && role && role !== "admin") {
        console.log("You are not an Admin. Logging out...");

        await logOut();
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    checkRole();
  }, [role, loading, logOut, navigate, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return role === "admin" ? children : null;
};

export default AdminRoute;
