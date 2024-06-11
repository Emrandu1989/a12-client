import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [salaryInputs, setSalaryInputs] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(
      "https://machine-world-server.vercel.app/allEmployee"
    );
    const data = await response.json();
    setEmployees(data);
  };

  const handleFire = async (email) => {
    await fetch(
      `https://machine-world-server.vercel.app/allEmployeeUp/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "fired" }),
      }
    );

    fetchEmployees();

    Swal.fire(
      "Done!",
      `Employee with email ${email} has been fired.`,
      "success"
    );
  };

  const handlePromote = async (email) => {
    await fetch(
      `https://machine-world-server.vercel.app/allEmployeeUp/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "HR" }),
      }
    );

    fetchEmployees();

    Swal.fire(
      "Done!",
      `Employee with email ${email} has been promoted to HR.`,
      "success"
    );
  };

  const handleSalaryChange = (email, newSalary) => {
    setSalaryInputs((prevInputs) => ({
      ...prevInputs,
      [email]: newSalary,
    }));
  };

  const handleSalaryUpdate = async (email) => {
    const newSalary = salaryInputs[email];
    if (newSalary == null) return;

    await fetch(
      `https://machine-world-server.vercel.app/allEmployeeUpS/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salary: newSalary }),
      }
    );

    fetchEmployees();

    Swal.fire(
      "Done!",
      `Employee with email ${email}'s salary has been updated.`,
      "success"
    );
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

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "card" : "table"));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={toggleViewMode}
        >
          Toggle View
        </button>
      </div>
      {viewMode === "table" ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Designation</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">Update Salary</th>
              <th className="py-2 px-4 border-b">Make HR</th>
              <th className="py-2 px-4 border-b">Fire</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.email}>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.designation}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="number"
                    value={salaryInputs[employee.email] ?? employee.salary}
                    onChange={(e) =>
                      handleSalaryChange(employee.email, e.target.value)
                    }
                    className="w-full p-1 border"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleSalaryUpdate(employee.email)}
                    disabled={
                      salaryInputs[employee.email] == null ||
                      salaryInputs[employee.email] === employee.salary
                    }
                  >
                    Update
                  </button>
                </td>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.email}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
              <p className="mb-2">Designation: {employee.designation}</p>
              <p className="mb-2">Role: {employee.role}</p>
              <p className="mb-2">
                Salary:{" "}
                <input
                  type="number"
                  value={salaryInputs[employee.email] ?? employee.salary}
                  onChange={(e) =>
                    handleSalaryChange(employee.email, e.target.value)
                  }
                  className="w-full p-1 border"
                />
              </p>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded w-full mb-2"
                onClick={() => handleSalaryUpdate(employee.email)}
                disabled={
                  salaryInputs[employee.email] == null ||
                  salaryInputs[employee.email] === employee.salary
                }
              >
                Update Salary
              </button>
              <div className="flex justify-between gap-2">
                {employee.role === "Employee" && (
                  <button
                    className="bg-green-500 w-full text-white px-2 py-1 rounded"
                    onClick={() => confirmAction(employee, "promote")}
                  >
                    Promote to HR
                  </button>
                )}
                {employee.role !== "fired" ? (
                  <button
                    className={`bg-red-500 w-full text-white px-2 py-1 rounded ${
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;
