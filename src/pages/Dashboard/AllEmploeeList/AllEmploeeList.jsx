import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/allEmployee");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleFire = async (email) => {
    try {
      // Update the user's role to "fired"
      await fetch(`http://localhost:3000/allEmployeeUp/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role: "fired" }),
      });

      fetchEmployees();

      Swal.fire(
        "Done!",
        `Employee with email ${email} has been fired.`,
        "success"
      );
    } catch (error) {
      console.error("Error HR employee:", error);

      Swal.fire(
        "Error!",
        "An error occurred while firing the employee.",
        "error"
      );
    }
  };

  const handlePromote = async (email) => {
    try {
      // Update the user's role to "HR"
      await fetch(`http://localhost:3000/allEmployeeUp/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role: "HR" }),
      });

      fetchEmployees();

      Swal.fire(
        "Done!",
        `Employee with email ${email} has been promoted to HR.`,
        "success"
      );
    } catch (error) {
      console.error("Error HR employee:", error);
      // Show error message if any
      Swal.fire(
        "Error!",
        "An error occurred while HR the employee.",
        "error"
      );
    }
  };

  const confirmAction = (employee, action) => {
    const actionText = action === "fire" ? "fire" : "promote";
    const actionFunc = action === "fire" ? handleFire : handlePromote;
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to ${actionText} ${employee.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        actionFunc(employee.email);
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">Make HR</th>
            <th className="py-2 px-4 border-b">Fire</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.email}>
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.designation}</td>
              <td className="py-2 px-4 border-b text-center">
                {employee.role === "Employee" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => confirmAction(employee, "promote")}
                  >
                    Promote to HR
                  </button>
                )}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {employee.role !== "fired" ? (
                  <button
                    className={`bg-red-500 text-white px-2 py-1 rounded ${
                      employee.role === "admin" ? "disabled:opacity-50" : ""
                    }`}
                    onClick={() =>
                      employee.role !== "admin"
                        ? confirmAction(employee, "fire")
                        : null
                    }
                    disabled={employee.role === "admin"}
                  >
                    Fire
                  </button>
                ) : (
                  "Fired"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployeeList;
