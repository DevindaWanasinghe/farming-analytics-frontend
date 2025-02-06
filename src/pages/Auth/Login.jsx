import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../../Validator";
import { TiWarningOutline } from "react-icons/ti";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", role: "admin" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    if (name === "email") error = validateEmail(value);
    if (name === "password") error = validatePassword(value);

    setErrors({
      ...errors,
      [name]: error === "valid" ? "" : error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(formData.email) !== "valid" || validatePassword(formData.password) !== "valid") {
      setErrors({
        email: validateEmail(formData.email) !== "valid" ? validateEmail(formData.email) : "",
        password: validatePassword(formData.password) !== "valid" ? validatePassword(formData.password) : "",
      });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/admin/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const tokenData = await response.data.data;
      if (response.status !== 200 || response.data.status !== "sucsess") {
        throw new Error(tokenData.message || "Login failed. Please try again.");
      }

      toast.success("Login successful!", { autoClose: 1500 });

      localStorage.setItem("accessToken", tokenData.accessToken);
      localStorage.setItem("refreshToken", tokenData.refreshToken);
      localStorage.setItem("login", false);

      setFormData("");
      navigate("/dashboard");
    } catch (error) {
      const apiErrorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(apiErrorMessage, { style: { color: "red", fontFamily: "'Arial', sans-serif" }, autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 rounded-md shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-center text-gray-900">
          Log in to UniFeast Admin Panel
        </h1>
        <p className="mb-6 font-semibold text-center text-orange-500">
          Super Admin and Admin Secure Login Portal
        </p>

        <select
          name="role"
          value={formData.role}
          onChange={handlechange}
          className="w-full p-3 mb-4 text-gray-900 border border-orange-500 rounded-md focus:ring-2 focus:ring-orange-400"
        >
          <option value="admin">Admin</option>
          <option value="super-admin">Super Admin</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-orange-400"
          autoComplete="off"
          onChange={handlechange}
        />
        {errors.email && (
          <div className="flex items-center mb-2 text-[11px] text-red-500">
            <TiWarningOutline className="mr-2" />
            {errors.email}
          </div>
        )}

        <div className="relative mb-4 ">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            className="w-full p-3 pr-10 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-orange-400"
            autoComplete="new-password"
            style={{
              appearance: "none !important",
              WebkitAppearance: "none !important",
              MozAppearance: "none !important",
            }}
            onChange={handlechange}
          />
          {errors.password && (
            <div className="flex items-center mt-2 text-[11px] text-red-500">
              <TiWarningOutline className="mr-2" />
              {errors.password}
            </div>
          )}
          <div
            className= {`absolute flex items-center cursor-pointer right-3  ${ errors.password ? "-mt-[56px]" : "-mt-[32px] "} `}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
          </div>
        </div>

        {loading ? (
          <button
            disabled
            className="bg-orange-500 w-full h-[45px] text-white font-bold rounded-md flex items-center justify-center"
          >
            Logging in...
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-orange-500 w-full h-[45px] text-white hover:bg-orange-600 font-bold rounded-md"
          >
            Login
          </button>
        )}

        <p onClick={() => navigate("/signin")} className="mt-4 text-center text-orange-500 cursor-pointer">
          Super Admin Sign In
        </p>
      </div>
    </div>
  );
};

export default Login;
