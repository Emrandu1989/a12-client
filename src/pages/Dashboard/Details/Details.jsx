import { useEffect, useState } from "react";
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
    fetch(`http://localhost:3000/payments/${data?.email}`)
      .then((res) => res.json())
      .then((datas) => {
        setPaymentData(datas);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
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
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Employee Details</h2>
          <img src={data.image} alt={data.name} className="w-full h-48 object-cover rounded mb-4" />
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Bank Account:</strong> {data.bankAccount}</p>
          <p><strong>Salary:</strong> {data.salary}</p>
          <p><strong>Role:</strong> {data.role}</p>
          <p><strong>Designation:</strong> {data.designation}</p>
        
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300} className="mt-10">
        <BarChart width={500} height={300} data={paymentData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price">
            {paymentData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.price)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Details;
