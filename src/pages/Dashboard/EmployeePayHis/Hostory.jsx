import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const EHistory = () => {
  const [userPayments, setUserPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await fetch(`https://machine-world-server.vercel.app/payments/${email}`);
          const data = await response.json();
          setUserPayments(data);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchData();
  }, [email]);

  // Get current payments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = userPayments
    .slice()
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {userPayments?.length > 0 ? (
            <>
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
                  {currentPayments.map((payment) => (
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
              <div className="flex justify-center mt-4">
                <button
                  className={`btn ${currentPage === 1 ? "btn-disabled" : ""}`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[
                  ...Array(
                    Math.ceil(userPayments?.length / itemsPerPage)
                  ).keys(),
                ].map((page) => (
                  <button
                    key={page + 1}
                    className={`btn mx-1 ${
                      currentPage === page + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => paginate(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  className={`btn ${
                    currentPage ===
                    Math.ceil(userPayments?.length / itemsPerPage)
                      ? "btn-disabled"
                      : ""
                  }`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(userPayments?.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            </>
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

export default EHistory;
