// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // import useAuth
import { login } from "../api/auth"; // import API
import { useFormik } from "formik";
import * as Yup from "yup"; // Form authentication

const LoginPage = () => {
  const { login: loginContext } = useAuth(); // Login method
  const navigate = useNavigate(); // Redirection

  // Formik form management
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false, // Remember me option
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required."),
    }),
    onSubmit: async (values) => {
      try {
        // Deploy login API
        const userData = await login(values.email, values.password);

        // Save JWT token and user info
        if (values.rememberMe) {
          localStorage.setItem("token", userData.token); // Remember me: save to localStorage
        } else {
          sessionStorage.setItem("token", userData.token); // Not Remember me: save to sessionStorage
        }

        loginContext(userData); // Update context for user data
        navigate("/"); // Redirect to homepage after login, will optimize it to previous page afterward
      } catch (error) {
        alert(error.message); 
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="mr-2"
              {...formik.getFieldProps("rememberMe")}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember me</label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>

          {/* Register Now Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-800">Register Now</a>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;