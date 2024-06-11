import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Box from "../Boxs/Box";
import Profile from "../Profile/Profile";

const AdminHome = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [worksheets, setWorksheets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (email) {
        try {
          const res = await fetch(`http://localhost:3000/allEmployees/${email}`);
          const data = await res.json();
          setRole(data[0]?.role);
          setIsLoading(false);
        } catch (err) {
          setError("Failed to fetch role data");
          setIsLoading(false);
        }
      }
    };
    fetchRole();
  }, [email]);

  useEffect(() => {
    const fetchWorksheets = async () => {
      if (role === "HR") {
        try {
          const res = await fetch(`http://localhost:3000/workSheet`);
          const data = await res.json();
          setWorksheets(data);
        } catch (err) {
          setError("Failed to fetch worksheets");
        }
      }
    };
    fetchWorksheets();
  }, [role]);

  // Render loading indicator when data is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      {role === "HR" && (
        <>
          <Box />
          <Profile />
          <h1 className="text-4xl font-bold mb-8 text-center">Hi, I'm an HR</h1>
          <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-30 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">All Worksheets</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white bg-opacity-20 rounded-lg">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600">Work Name</th>
                    <th className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600">Work Submit</th>
                    <th className="py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600">Working Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {worksheets.map((worksheet) => (
                    <tr key={worksheet._id} className="border-b text-black border-gray-200">
                      <td className="py-4 px-6">{worksheet.choice}</td>
                      <td className="py-4 px-6">{worksheet.date}</td>
                      <td className="py-4 px-6">{worksheet.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {role === "Employee" && (
        <>
          <Box />
          <Profile />
        </>
      )}
      {role === "admin" && (
        <>
          <Box />
          <Profile />
        </>
      )}
    </div>
  );
};

export default AdminHome;
