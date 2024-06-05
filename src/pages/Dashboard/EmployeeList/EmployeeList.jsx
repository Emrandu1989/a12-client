import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const EmployeeList = () => {
    const [allEmployee, setAllEmployee] = useState([]);
    console.log(allEmployee);
  
    const fetchSheet = () => {
      fetch("http://localhost:3000/allEmployee")
        .then((res) => res.json())
        .then((data) => {
          setAllEmployee(data);
        });
    };
  
    useEffect(() => {
      fetchSheet();
    }, []);
    return (
        <>
             <h2>Employee List</h2>
             <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
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
      {allEmployee.slice().reverse().map((employee, idx) =><tr
       key={employee._id}
      className="bg-base-200">
        <th>{idx + 1}</th>
        <td>{employee?.name}</td>
        <td>{employee.email}</td>
        <td>X</td>
        <th>{employee.bankAccount}</th>
        <td>{employee.salary}</td>
        <td> <button className="btn bg-green-600">Pay</button> </td>
        <td><Link to={`/dashboard/details/${employee._id}`}><button className="btn btn-primary">Details</button> </Link></td>
      </tr> )}
     
 
    </tbody>
  </table>
</div>
        </>
    );
};

export default EmployeeList;