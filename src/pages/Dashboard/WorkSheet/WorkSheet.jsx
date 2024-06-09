import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const WorkSheet = () => {
  const date = new Date();
  const { user } = useAuth();
  const name = user?.displayName;
  const email = user?.email;
  const [workSheet, setWorkSheet] = useState([]);
  const [datasemail, setDatasEmail] = useState("");

  // Fetch and set worksheet data
  const fetchSheet = () => {
    fetch("http://localhost:3000/workSheet")
      .then((res) => res.json())
      .then((data) => {
        setWorkSheet(data);
      });
  };

  // Fetch the email of the current user and worksheet data on component mount
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/allEmployees/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setDatasEmail(data?.email);
        });
    }
    fetchSheet();
  }, [email]);

  // Handle form submission
  const handleWorkSheetData = (e) => {
    e.preventDefault();
    const form = e.target;
    const choice = form.choice.value;
    const hours = form.hours.value;
    const date = form.date.value;
    const workData = { choice, hours, date, name, email };

    fetch("http://localhost:3000/workSheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success",
          text: "Your Work Sheet Will Added",
          icon: "success",
        });
        fetchSheet();
        form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
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
          />
          <input
            className="p-1 rounded-lg"
            defaultValue={`${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-01`}
            type="date"
            name="date"
            id=""
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
              .filter((workData) => workData.email === datasemail)
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
