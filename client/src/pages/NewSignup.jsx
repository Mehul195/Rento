import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewSignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Check if the input is for the phone field
    if (id === "phone") {
      // Replace any non-numeric characters with an empty string
      const phoneNumber = value.replace(/\D/g, "");
      // Update the state only if the value is numeric or empty
      setFormData({ ...formData, [id]: phoneNumber });
    } else {
      // For other fields, update the state normally
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        email: formData.email,
        phoneno: formData.phone,
        password: formData.password,
        username: formData.username,
      });

      navigate("/");
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Error:", error.response.data.message); // Error message from the server
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-green-200">
      <div className="rounded-lg border bg-white shadow-lg w-full max-w-screen-md">
        <div className="grid grid-cols-2">
          <div className="w-full h-full bg-gray-200" />
          <div className="p-6 flex flex-col gap-1.5">
            <div className="space-y-1.5 p-6 flex flex-col gap-1.5">
              <div className="text-lg font-bold text-gray-800">
                Welcome to our community
              </div>
              <div className="text-base text-gray-600">
                Create your account
              </div>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 overflow-hidden"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 overflow-hidden"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  type="tel"
                  pattern="[0-9]*"
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 overflow-hidden"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 overflow-hidden"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2 mt-4 self-start"
                type="submit"
              >
                Sign up
              </button>
            </form>
            <div className="flex justify-center text-sm text-gray-600 mt-4">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
