import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCog,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileAlt,
  FaUser,
  FaUserShield,
  FaUserTag,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Box = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [worksheets, setWorksheets] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(`http://localhost:3000/allEmployee`);
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const servicesResponse = await fetch(`http://localhost:3000/services`);
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        const worksheetsResponse = await fetch(
          `http://localhost:3000/workSheet`
        );
        const worksheetsData = await worksheetsResponse.json();
        setWorksheets(worksheetsData);

        const messagesResponse = await fetch(`http://localhost:3000/message`);
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error!", "An error occurred while fetching data.", "error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (email) {
        try {
          const response = await fetch(
            `http://localhost:3000/allEmployees/${email}`
          );
          const data = await response.json();
          setRole(data[0]?.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          Swal.fire(
            "Error!",
            "An error occurred while fetching user role.",
            "error"
          );
        }
      }
    };

    fetchUserRole();
  }, [email]);

  const unverifiedUsersCount = users?.filter((user) => !user.verified).length;
  const verifiedUsersCount = users?.filter((user) => user.verified).length;
  const userWorksheets = worksheets?.filter(
    (worksheet) => worksheet.email === email
  );
  const totalHoursWorked = userWorksheets?.reduce(
    (total, worksheet) => total + Number(worksheet.hours),
    0
  );
  const hrCount = users?.filter((user) => user.role === "HR").length;

  const boxStyles =
    "bg-white bg-opacity-70 shadow-lg rounded-lg py-10 px-6 w-full md:w-[400px] flex items-center justify-between transform transition-transform hover:scale-105";
  const colors = {
    totalUsers: "bg-gradient-to-r from-blue-400 to-purple-500",
    totalServices: "bg-gradient-to-r from-green-400 to-teal-500",
    unverifiedUsers: "bg-gradient-to-r from-red-400 to-pink-500",
    totalWorksheets: "bg-gradient-to-r from-yellow-400 to-orange-500",
    totalHoursWorked: "bg-gradient-to-r from-indigo-400 to-blue-500",
    userRole: "bg-gradient-to-r from-purple-400 to-indigo-500",
    totalMessages: "bg-gradient-to-r from-pink-400 to-red-500",
    totalHR: "bg-gradient-to-r from-green-400 to-blue-500",
    verifiedUsers: "bg-gradient-to-r from-teal-400 to-green-500",
  };

  return (
    <div>
      {role === "HR" && (
        <div className="flex flex-wrap justify-center gap-6">
          <div className={`${boxStyles} ${colors.totalUsers}`}>
            <FaUser className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{users?.length}</h1>
              <p className="text-white">Total Users</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalServices}`}>
            <FaCog className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {services.length}
              </h1>
              <p className="text-white">Total Services</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.unverifiedUsers}`}>
            <FaExclamationTriangle className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {unverifiedUsersCount}
              </h1>
              <p className="text-white">Unverified Users</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalWorksheets}`}>
            <FaFileAlt className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {worksheets?.length}
              </h1>
              <p className="text-white">Total Worksheets</p>
            </div>
          </div>
        </div>
      )}
      {role === "Employee" && (
        <div className="flex flex-wrap justify-center gap-6">
          <div className={`${boxStyles} ${colors.totalWorksheets}`}>
            <FaFileAlt className="text-4xl text-white mr-4" />
            <div>
              <p className="text-white">My Worksheets</p>
              <h1 className="text-3xl font-bold text-white">
                {userWorksheets?.length}
              </h1>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalHoursWorked}`}>
            <FaClock className="text-4xl text-white mr-4" />
            <div>
              <p className="text-white">Total Working Hours</p>
              <h1 className="text-3xl font-bold text-white">
                {totalHoursWorked}
              </h1>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.userRole}`}>
            <FaUserTag className="text-4xl text-white mr-4" />
            <div>
              <p className="text-white">My Role</p>
              <h1 className="text-3xl font-bold text-white">{role}</h1>
            </div>
          </div>
        </div>
      )}
      {role === "admin" && (
        <div className="flex flex-wrap justify-center gap-6">
          <div className={`${boxStyles} ${colors.totalUsers}`}>
            <FaUsers className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{users?.length}</h1>
              <p className="text-white">Total Users</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalMessages}`}>
            <FaEnvelope className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {messages.length}
              </h1>
              <p className="text-white">Total Messages</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.totalHR}`}>
            <FaUserShield className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">{hrCount}</h1>
              <p className="text-white">Total HR</p>
            </div>
          </div>
          <div className={`${boxStyles} ${colors.verifiedUsers}`}>
            <FaUserShield className="text-4xl text-white mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {verifiedUsersCount}
              </h1>
              <p className="text-white">Verified Users</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
