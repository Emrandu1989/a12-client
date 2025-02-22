import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Seemessage = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMessageIds, setExpandedMessageIds] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch(
      "https://machine-world-server.vercel.app/message"
    );
    const data = await response.json();
    setMessages(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this message!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessage(id);
      }
    });
  };

  const deleteMessage = async (id) => {
    await fetch(`https://machine-world-server.vercel.app/message/${id}`, {
      method: "DELETE",
    });
    // After deletion, fetch updated messages
    fetchMessages();
    Swal.fire("Deleted!", "Your message has been deleted.", "success");
  };

  const toggleExpandMessage = (id) => {
    setExpandedMessageIds((prevExpandedIds) =>
      prevExpandedIds.includes(id)
        ? prevExpandedIds.filter((messageId) => messageId !== id)
        : [...prevExpandedIds, id]
    );
  };

  const renderMessageContent = (message) => {
    const maxLength = 100;
    const isExpanded = expandedMessageIds.includes(message._id);
    const content = isExpanded
      ? message.message
      : `${message.message.slice(0, maxLength)}...`;

    return (
      <div>
        <p>{content}</p>
        {message.message.length > maxLength && (
          <button
            onClick={() => toggleExpandMessage(message._id)}
            className="text-blue-500 underline cursor-pointer"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Messages</h2>
      <table className="min-w-full table-auto border-collapse border border-green-800">
        <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td className="border px-4 py-2">{message.email}</td>
              <td className="border px-4 py-2">
                {renderMessageContent(message)}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(message._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md transition duration-300 flex items-center justify-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Seemessage;
