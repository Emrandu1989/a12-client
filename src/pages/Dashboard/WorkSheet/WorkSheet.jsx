import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const WorkSheet = () => {
  const date = new Date();
  const { user } = useAuth();
  const [workSheet, setWorkSheet] = useState([]);
  const [userEmail, setUserEmail] = useState(user?.email || "");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/allEmployees/${user.email}`);
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

    if (!choice || !hours || !date) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
      });
      return;
    }

    const workData = { choice, hours, date, name, email };

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
        className="bg-green-600 mb-12 py-9 px-12 rounded-lg"
      >
        <div className="space-x-9">
          <select className="p-1 rounded-lg" name="choice" id="">
            <option value="">Choose Work</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="content">Content</option>
            <option value="paper-work">Paper-Work</option>
          </select>
          <input
            name="hours"
            className="p-1 rounded-lg"
            type="number"
            placeholder="Hours"
            min="1"
            required
          />
          <input
            className="p-1 rounded-lg"
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
                <tr key={workData._id} className="bg-base-200">
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
