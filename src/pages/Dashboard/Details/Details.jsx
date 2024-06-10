import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Details = () => {
  const data = useLoaderData();
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://machine-world-server.vercel.app/payments/${data.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPaymentData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data.email]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Add a spinner or progress bar here */}
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Display an error message */}
        Error: {error}
      </div>
    );
  }

  const getBarColor = (amount) => {
    if (amount <= 300) return "#ff0000"; // red
    if (amount <= 500) return "#ffff00"; // yellow
    return "#00ff00"; // green
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
        {/* Display user details */}
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
