import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";

const EHostory = () => {
  const [userPayments, setUserPayments] = useState([]);
  const { user } = useAuth();
  const email = user?.email;
  useEffect(() => {
    fetch(`http://localhost:3000/payments/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPayments(data);
      })
      .catch((error) =>
        console.error("Error fetching payment history:", error)
      );
  }, [user]);

  return (
    <div>
      <motion.div
        className="mx-auto p-6 bg-white shadow-md rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          {userPayments.length > 0 ? (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Transaction ID</th>
                  <th className="py-3 px-6 text-left">Month</th>
                  <th className="py-3 px-6 text-left">Year</th>
                  <th className="py-3 px-6 text-left">Transaction Date</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {userPayments.map((payment) => (
                  <motion.tr
                    key={payment._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <td className="py-3 px-6">{payment.transactionId}</td>
                    <td className="py-3 px-6">{payment?.month}</td>
                    <td className="py-3 px-6">{payment?.year}</td>
                    <td className="py-3 px-6">{payment.SubmitDate}</td>
                    <td className="py-3 px-6">$ {payment.price}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 text-center">
              You don't have any payments.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EHostory;
