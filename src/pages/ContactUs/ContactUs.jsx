import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://machine-world-server.vercel.app/message", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your message has been sent successfully.",
            confirmButtonText: "OK",
          });
          console.log("Form submitted successfully!");
        } else {
          // Handle error, e.g., show an error message
          console.error("Form submission failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });

    // Reset form fields
    setFormData({
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-green-100 md:p-20 gap-10">
      <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <div className="bg-white p-8 rounded-lg shadow-md w-full transform transition-all duration-500 hover:shadow-lg hover:scale-105">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 text-left">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Contact Information
        </h2>
        <p className="text-gray-600 mb-6">
          Have any questions or opinions? Feel free to reach out to us using the
          form on the left. We'll be glad to hear from you!
        </p>
        <p className="text-gray-600">You can also contact us at:</p>
        <p className="text-gray-600 font-medium">
          Email: contact@dummycompany.com
        </p>
        <p className="text-gray-600 font-medium">Phone: +1 234 567 890</p>
        <p className="text-gray-600 font-medium">
          Address: 1234 Elm Street, City, Country
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
