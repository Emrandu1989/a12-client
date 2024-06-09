import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Fetch payment history data from the server
        fetch('http://localhost:3000/payments')
            .then(res => res.json())
            .then(data => {
                setPayments(data);
            })
            .catch(error => console.error('Error fetching payment history:', error));
    }, []);

    return (
        <motion.div 
            className=" mx-auto p-6 bg-white shadow-md rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Transaction ID</th>
                            <th className="py-3 px-6 text-left">Transaction Date</th>
                            <th className="py-3 px-6 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {payments.map(payment => (
                            <motion.tr 
                                key={payment._id} 
                                className="border-b border-gray-200 hover:bg-gray-100"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <td className="py-3 px-6">{payment.transactionId}</td>
                                <td className="py-3 px-6">{payment.SubmitDate}</td>
                                <td className="py-3 px-6">{payment.price}</td>
                                
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default PaymentHistory;
