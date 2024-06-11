import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const WorkSheet = () => {
  const date = new Date();
  const { user } = useAuth();
  const [workSheet, setWorkSheet] = useState([]);
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/allEmployees/${user.email}`
        );
        const data = await response.json();
        setUserEmail(data[0]?.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchSheetData = async () => {
      try {
        const response = await fetch("http://localhost:3000/workSheet");
        const data = await response.json();
        setWorkSheet(data);
      } catch (error) {
        console.error("Error fetching worksheet data:", error);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
    fetchSheetData();
  }, [user]);

  const fetchSheetData = async () => {
    try {
      const response = await fetch("http://localhost:3000/workSheet");
      const data = await response.json();
      setWorkSheet(data);
    } catch (error) {
      console.error("Error fetching worksheet data:", error);
    }
  };

  const handleWorkSheetData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const choice = form.choice.value;
    const hours = form.hours.value;
    const date = form.date.value;
    const name = user.displayName;
    const email = user.email;
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
    const monthName = monthNames[selectedMonth - 1];  

    if (!choice || !hours || !date) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
      });
      return;
    }

    const workData = { choice, hours, date, name, email, month: monthName }; // Include month name in workData

    try {
      const response = await fetch("http://localhost:3000/workSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workData),
      });
      const data = await response.json();
      Swal.fire({
        title: "Success",
        text: "Your Work Sheet Will Be Added",
        icon: "success",
      });
      fetchSheetData(); // Fetch the updated worksheet data after adding a new entry
      form.reset();
    } catch (error) {
      console.error("Error adding work sheet data:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add work sheet data",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleWorkSheetData}
        className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white mb-12 py-9 px-12 rounded-lg"
      >
        <div className="space-x-9">
          <select
            className="p-1 rounded-lg bg-white text-black"
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            value={selectedMonth}
          >
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

          <select className="p-1 rounded-lg bg-white text-black" name="choice" id="">
            <option value="">Choose Work</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="content">Content</option>
            <option value="paper-work">Paper-Work</option>
          </select>
          <input
            name="hours"
            className="p-1 rounded-lg bg-white text-black"
            type="number"
            placeholder="Hours"
            min="1"
            required
          />
          <input
            className="p-1 rounded-lg bg-white text-black"
            defaultValue={`${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-01`}
            type="date"
            name="date"
            id=""
            required
          />
          <input className="p-1 text-black btn" type="submit" value="Submit" />
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tasks</th>
              <th>Working Hours</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {workSheet
              .filter((workData) => workData.email === userEmail)
              .slice()
              .reverse()
              .map((workData, index) => (
                <tr key={workData._id} className="bg-purple-100">
                  <th>{index + 1}</th>
                  <td>{workData.choice}</td>
                  <td>{workData.hours} Hours</td>
                  <td>{workData.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkSheet;
