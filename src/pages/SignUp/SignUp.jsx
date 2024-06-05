import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; // Make sure this path is correct
import { imageUpload } from "../../api/utils/index";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Employee"); // Default role
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();

  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();

  const handelGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        title: "Signup Successful",
        text: "You have successfully signed up.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (err) {
      Swal.fire({
        title: "Signup Failed",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await imageUpload(image);
      await createUser(email, password);
      await updateUserProfile(name, imageUrl);

      const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          bankAccount: bankAccount,
          salary: salary,
          image: imageUrl,
          role: role,
          designation: designation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      Swal.fire({
        title: "Signup Successful",
        text: "You have successfully signed up.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Signup Failed",
        text: err.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bankAccount"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Account No
            </label>
            <input
              id="bankAccount"
              type="text"
              placeholder="Enter your Bank Account No"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              id="salary"
              type="text"
              placeholder="Enter your salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Admin" disabled>
                ADMIN
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Designation</option>
              <option value="Sales Assistant">Sales Assistant</option>
              <option value="Social Media Executive">
                Social Media Executive
              </option>
              <option value="Digital Marketer">Digital Marketer</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <FaRegEye className="text-2xl mt-7" />
              ) : (
                <FaRegEyeSlash className="text-2xl mt-7" />
              )}
            </button>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Picture
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-green-500"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handelGoogleSignIn()}
            className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            <FaGoogle className="mr-2" />
            Sign Up with Google
          </button>
        </div>
        <div className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
