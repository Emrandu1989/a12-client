import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const data = useLoaderData();
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/payments/${data.email}`)
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [data.email]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Define a function to get the color based on the value
  const getBarColor = (amount) => {
    if (amount <= 300) return "#ff0000";  // red
    if (amount <= 500) return "#ffff00";  // yellow
    return "#00ff00"; // green
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
        <div className="sm:flex sm:items-center px-6 py-4">
          <img
            className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
            src={data.image}
            alt={data.name}
          />
          <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2 className="text-xl leading-tight font-bold">{data.name}</h2>
            <p className="text-sm leading-tight text-gray-600">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="text-sm leading-tight text-gray-600">
              <strong>Bank Account:</strong> {data.bankAccount}
            </p>
            <p className="text-sm leading-tight text-gray-600">
              <strong>Salary:</strong> ${data.salary}
            </p>
            <p className="text-sm leading-tight text-gray-600">
              <strong>Role:</strong> {data.role}
            </p>
            <p className="text-sm leading-tight text-gray-600">
              <strong>Designation:</strong> {data.designation}
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className="mt-10">
        <BarChart width={500} height={300} data={paymentData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price">
            {paymentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.price)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Details;
