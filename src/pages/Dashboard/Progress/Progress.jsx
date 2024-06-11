import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Progress = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchWorksheets = async () => {
      const response = await fetch(
        "https://machine-world-server.vercel.app/workSheet"
      );
      const data = await response.json();
      setWorksheets(data);
      setIsLoading(false);
    };

    fetchWorksheets();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "https://machine-world-server.vercel.app/allEmployee"
      );
      const data = await response.json();
      const employeeNames = data.map((employee) => employee.name);
      setEmployees(employeeNames);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleMonthChange = (event) => {
    const selectedMonthValue = event.target.value;
    setSelectedMonth(selectedMonthValue);
    const selectedMonthName = monthNames[selectedMonthValue - 1];

    // now  Here Filter the worksheet by the selected month if the
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Progress</h1>
      <div className="flex justify-center mb-4">
        <select
          className="p-2 border rounded-md shadow-sm mr-4"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
        >
          <option value="">Select Employee</option>
          {employees.map((employee, index) => (
            <option key={index} value={employee}>
              {employee}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded-md shadow-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold tracking-wider">
              <th className="px-6 py-3">Work Name</th>
              <th className="px-6 py-3">Work Submit</th>
              <th className="px-6 py-3">Working Hours</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Month</th>
            </tr>
          </thead>
          <motion.tbody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-700 text-sm"
          >
            {worksheets
              .filter((worksheet) =>
                selectedEmployee ? worksheet.name === selectedEmployee : true
              )
              .map((worksheet) => (
                <motion.tr
                  key={worksheet._id}
                  whileHover={{ scale: 1.05 }}
                  className="border-b"
                >
                  <td className="px-6 py-4">{worksheet.choice}</td>
                  <td className="px-6 py-4">{worksheet.date}</td>
                  <td className="px-6 py-4">{worksheet.hours}</td>
                  <td className="px-6 py-4">{worksheet.name}</td>
                  <td className="px-6 py-4">{worksheet.email}</td>
                  <td className="px-6 py-4">{worksheet.month}</td>
                </motion.tr>
              ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
