import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckOut";

const EmployeeList = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState(0);
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

  const handlePay = (salary) => {
    setSelectedEmployeeSalary(salary);
    document.getElementById("my_modal_1").showModal();
  };

  useEffect(() => {
    fetchSheet();
  }, []);

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
            {allEmployee.slice().reverse().map((employee, idx) => (
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
                      onClick={() => handlePay(employee.salary)}
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      className="btn bg-green-600"
                      disabled
                    >
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
          <Elements stripe={stripePromise}>
            <CheckoutForm totalToPay={selectedEmployeeSalary} />
          </Elements>
        </div>
      </dialog>
    </>
  );
};

export default EmployeeList;
