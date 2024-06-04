import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { imageUpload } from "../../api/utils/index";
import { motion } from "framer-motion";

const SignUp = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;

    // Upload image if selected
    const imageUrl = image ? await imageUpload(image) : null;

    // Regular expressions for password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Password must have at least 6 characters, one uppercase, and one lowercase letter",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    // Additional form data
    const user = {
      email,
      password,
      bankAccountNo: form.bankAccountNo.value,
      salary: form.salary.value,
      designation: form.designation.value,
      role: form.role.value,
    };

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          profilePic: user.profilePic,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignUp = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="bankAccountNo" className="sr-only">
                Your Bank Account No
              </label>
              <input
                id="bankAccountNo"
                name="bankAccountNo"
                type="text"
                autoComplete="bank-account"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Bank Account No"
              />
            </div>
            <div>
              <label htmlFor="salary" className="sr-only">
                Your Salary Amount
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                autoComplete="salary"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Salary Amount"
              />
            </div>
            <div>
              <label htmlFor="designation" className="sr-only">
                Your Designation
              </label>
              <select
                id="designation"
                name="designation"
                autoComplete="designation"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option disabled selected>
                  Select Your Designation!
                </option>
                <option> Sales Assistant </option>
                <option> Social Media executive</option>
                <option> Digital Marketer</option>
              </select>
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                autoComplete="role"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option disabled selected>
                  What is your Role?
                </option>
                <option>Employee</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="profilePic" className="sr-only">
                Profile Picture
              </label>
              <input
                id="profilePic"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Add this line to trigger the function on image selection
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Profile Picture"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Sign Up
          </button>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center mb-8 text-center">
              <div className="text-xl">
                <Link
                  to="#"
                  className="text-center font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign Up With Socal Links
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGoogleSignUp}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaGoogle className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
