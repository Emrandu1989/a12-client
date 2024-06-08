import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUser, FaCog, FaExclamationTriangle, FaFileAlt } from "react-icons/fa";

const Box = () => {
  const { user } = useAuth();
  const email = user?.email || "";
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [worksheets, setWorksheets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/allEmployee`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/workSheet`)
      .then((res) => res.json())
      .then((data) => {
        setWorksheets(data);
      });
  }, []);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/allEmployees/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data?.role);
        });
    }
  }, [email]);

  const unverifiedUsersCount = users.filter(user => !user.verified).length;

  const boxStyles = "bg-white bg-opacity-70 shadow-lg rounded-lg py-10 px-6 w-full md:w-[380px] flex items-center";
  const colors = {
    totalUsers: "bg-gradient-to-r from-blue-400 to-purple-500",
    totalServices: "bg-gradient-to-r from-green-400 to-teal-500",
    unverifiedUsers: "bg-gradient-to-r from-red-400 to-pink-500",
    totalWorksheets: "bg-gradient-to-r from-yellow-400 to-orange-500",
  };

  return (
    <div>
      {role === "HR" && (
        <div className="flex flex-wrap justify-center gap-6">
          <div className={`${boxStyles} ${colors.totalUsers}`}>
            <FaUser className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{users.length}</h1>
              <p className="text-white">Total Users</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalServices}`}>
            <FaCog className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{services.length}</h1>
              <p className="text-white">Total Services</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.unverifiedUsers}`}>
            <FaExclamationTriangle className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{unverifiedUsersCount}</h1>
              <p className="text-white">Unverified Users</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalWorksheets}`}>
            <FaFileAlt className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{worksheets.length}</h1>
              <p className="text-white">Total Worksheets</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
