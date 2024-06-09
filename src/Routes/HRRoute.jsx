import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../provider/AuthProvider";

const HRRoute = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const email = user?.email || "";
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/allEmployees/${email}`)
                .then((res) => res.json())
                .then((data) => {
                    setRole(data?.role);
                })
                .catch(error => console.error('Error fetching role:', error));
        }
    }, [email]);

    useEffect(() => {
        if (role === "HR") {
            console.log("Welcome HR");
        } else if (role) {
            console.log("You are not HR. Logging out...");
            logOut().then(() => {
                navigate('/login', { state: { from: location }, replace: true });
            });
        }
    }, [role, logOut, navigate, location]);

    return role === "HR" ? children : null;
};

export default HRRoute;
