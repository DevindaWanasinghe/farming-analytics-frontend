import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validateName,
  validatePassword,
  validateNic,
  validateEmail,
} from "../../Validator";
import { toast } from "react-toastify";
import { TiWarningOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuperAdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lname: "",
    nic: "",
    password: "",
    securityKey: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    nic: "",
    password: "",
    check: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "nic") error = validateNic(value);
    if (name === "password") error = validatePassword(value);
    if (name === "securityKey") error = validatePassword(value);

    setErrors({
      ...errors,
      [name]: error === "valid" ? "" : error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit triggered");
    // console.log("Form Data:", formData);

    if (
      validateName(formData.name) !== "valid" ||
      validateNic(formData.nic) !== "valid" ||
      validatePassword(formData.password) !== "valid" ||
      validateEmail(formData.email) !== "valid" ||
      !isChecked
    ) {
      console.log("Validation failed");
      setErrors({
        name:
          validateName(formData.name) !== "valid"
            ? validateName(formData.name)
            : "",
        email:
          validateEmail(formData.email) !== "valid"
            ? validateEmail(formData.email)
            : "",
        nic:
          validateNic(formData.nic) !== "valid"
            ? validateNic(formData.nic)
            : "",
        password:
          validatePassword(formData.password) !== "valid"
            ? validatePassword(formData.password)
            : "",
        check: !isChecked,
      });
      return;
    }

    // console.log("Validation passed");
    setLoading(true);

    try {
      // Log the form data before sending it to the backend
      // console.log("Form Data sdw:", formData);

      const response = await axios.post(
        "http://localhost:3001/api/admin/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200 || response.data.status !== "sucsess") {
        throw new Error("Registration failed. Please try again.");
      }

      setErrors({ email: "", name: "", nic: "", password: "", check: false });
      navigate("/verifymail", { state: { email: formData.email } });
    } catch (error) {
      const apiErrorMessage =
        error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(apiErrorMessage, {
        style: { color: "red", fontFamily: "'Arial', sans-serif" },
        autoClose: 1500,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-center text-black">
          Sign in to Goviya.lk
        </h1>
        <h2 className="mb-4 text-lg font-bold text-center text-custom-orange">
          Enter Your Personal Details to Continue
        </h2>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          method="POST"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Your First Name"
            className="p-2 border rounded input"
          />
          {errors.name ? (
            <div className="flex ">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.name}
              </p>
            </div>
          ) : null}

          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            placeholder="Enter Your Last Name"
            className="p-2 border rounded input"
          />

          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            className="p-2 border rounded input"
          />
          {errors.email ? (
            <div className="flex ">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.email}
              </p>
            </div>
          ) : null}

          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            placeholder="Enter Your NIC Number"
            className="p-2 border rounded input"
          />
          {errors.nic ? (
            <div className="flex ">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.nic}
              </p>
            </div>
          ) : null}

          <div className="relative">
            <input
              type="text"
              name="securityKey"
              value={formData.securityKey}
              onChange={handleInputChange}
              placeholder="Enter Security Key"
              className="p-2 pr-10 border rounded input"
            />
            <FaEye className="absolute text-black right-3 top-3" />
          </div>
          {errors.securityKey ? (
            <div className="flex ">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.securityKey}
              </p>
            </div>
          ) : null}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="p-2 pr-10 border rounded input"
            />
            {showPassword ? (
              <FaEye
                className="absolute text-black cursor-pointer right-3 top-3"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className="absolute text-black cursor-pointer right-3 top-3"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password ? (
            <div className="flex ">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.password}
              </p>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={isChecked}
              onChange={handleCheck}
            />
            <label className="text-sm text-black">
              Yes, I understand and agree to the UniFeast Terms of Service
            </label>
          </div>

          <button
            type="submit"
            className="p-2 font-bold text-center text-white rounded bg-custom-orange"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
