import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // useAuth Hook
import { register } from "../api/auth"; 
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation

const RegisterPage = () => {
  const { login } = useAuth(); // The login function is used for automatic login after registration.
  const navigate = useNavigate(); // Jump to log in page
  const [successMessage, setSuccessMessage] = useState("");


  // Formik for form management
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "The username must contain between 4 and 20 characters.")
        .max(20, "The username must contain between 4 and 20 characters.")
        .matches(/^[a-zA-Z0-9_]+$/, "The username can only contain letters, numbers, and underscores (_).")
        .required("Username is required."),
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string()
        .min(8, "The password must contain at least 8 characters.")
        .matches(/[a-zA-Z]/, "The password must include at least one letter.")
        .matches(/[0-9]/, "The password must include at least one number.")
        .required("Password is required."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match, please ensure both password entries are the same.")
        .required("Please confirm your password."),
    }),

    onSubmit: async (values) => {
      try {
        const userData = await register(values.name, values.email, values.password);
        login(userData); // Auto login after registration
        setSuccessMessage("Registration successful! Please log in to your account.");
        setTimeout(() => navigate("/login"), 3000); // Redirect  to login page after registration
      } catch (error) {
        alert(error.message); // Feedback for error msg
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full"> 
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Create your Account</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              disabled={formik.isSubmitting}
            >
              Create Account
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default RegisterPage;