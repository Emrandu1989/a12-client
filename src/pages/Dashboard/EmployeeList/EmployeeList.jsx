import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CheckoutForm from "../CheckOut";

const EmployeeList = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  const fetchSheet = () => {
    fetch("http://localhost:3000/allEmployee")
      .then((res) => res.json())
      .then((data) => {
        setAllEmployee(data);
      });
  };

  const setVerified = (email) => {
    fetch(`http://localhost:3000/verifyEmployee/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verified: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Employee has been verified",
          icon: "success",
        });
        fetchSheet();
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to verify employee",
          icon: "error",
        });
      });
  };

  const handlePay = (employee) => {
    setSelectedEmployee(employee);
    document.getElementById("my_modal_1").showModal();
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  return (
    <>
      <h2>Employee List</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {allEmployee
              .slice()
              .reverse()
              .map((employee, idx) => (
                <tr key={employee._id} className="bg-base-200">
                  <th>{idx + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.verified ? (
                      <button className="text-xl">✅</button>
                    ) : (
                      <button
                        className="text-xl"
                        onClick={() => setVerified(employee.email)}
                      >
                        ❎
                      </button>
                    )}
                  </td>
                  <th>{employee.bankAccount}</th>
                  <td>{employee.salary}</td>
                  <td>
                    {employee.verified ? (
                      <button
                        className="btn bg-green-600"
                        onClick={() => handlePay(employee)}
                      >
                        Pay
                      </button>
                    ) : (
                      <button className="btn bg-green-600" disabled>
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/details/${employee._id}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl my-2 text-green-700 ">
              Total Payable Amount : ${" "}
              {selectedEmployee && selectedEmployee.salary}
            </h1>
            <button className="btn bg-red-500 text-white " onClick={closeModal}>
              X
            </button>
          </div>
          <label htmlFor="month">Month</label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="block w-full px-3 py-2 mb-4 border rounded-md"
          >
            <option value="" disabled>
              Select month
            </option>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={handleYearChange}
            className="block w-full px-3 py-2 mb-4 border rounded-md"
            placeholder="YYYY"
          />
          {selectedEmployee && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalToPay={selectedEmployee.salary}
                selectedEmail={selectedEmployee.email}
                month={month}
                year={year}
              />
            </Elements>
          )}
        </div>
      </dialog>
    </>
  );
};

export default EmployeeList;
