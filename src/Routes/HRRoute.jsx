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
        if (email) {
            fetch(`http://localhost:3000/allEmployees/${email}`)
                .then((res) => res.json())
                .then((data) => {
                    setRole(data?.role);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching role:', error);
                    setError("Failed to fetch role information.");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        if (!loading && role && role !== "HR") {
            console.log("You are not HR. Logging out...");
            logOut().then(() => {
                navigate('/login', { state: { from: location }, replace: true });
            });
        }
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
