import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiWarningOutline } from "react-icons/ti";


const VerifyEmail = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || ""; // Get email from state or default to empty
  const [formData, setFormData] = useState({ email: initialEmail, code: "" });
  const [errors, setErrors] = useState({ email: "", code: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateCode = (code) => {
    if (!code) return "Code is required.";
    if (!/^[0-9]{6}$/.test(code)) return "Code must be a 6-digit number.";
    return "valid";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    if (name === "email" && !value) error = "Email is required.";
    if (name === "code") error = validateCode(value);

    setErrors({
      ...errors,
      [name]: error === "valid" ? "" : error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered verified");  
   

    if (!formData.email || validateCode(formData.code) !== "valid") {
      // console.log("Validation failed:", formData);
      setErrors({
        email: !formData.email ? "Email is required." : "",
        code: validateCode(formData.code) !== "valid" ? validateCode(formData.code) : "",
      });
      return;
    }

    setLoading(true);

    try {
      // console.log("Form Data dd:", formData); // Log form data for debugging

      const response = await axios.post(
        "http://localhost:3001/api/auth/verifyemail",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );
     

      // console.log("Backend response:", response);

      if (response.status === 200 && response.data.status === "sucsess") {
        toast.success("Verification successful!", { autoClose: 1500 });
        setFormData({ email: "", code: "" });
        navigate("/");
      } else {
        throw new Error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      const apiErrorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(apiErrorMessage, {
        style: { color: "red", fontFamily: "'Arial', sans-serif" },
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-center text-black">
          Verify Your Email
        </h1>
        <h2 className="mb-4 text-lg font-bold text-center text-custom-orange">
          Enter the 6-digit code sent to your email
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit} method="POST">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            className="p-2 border rounded input"
          />
          {errors.email && (
            <div className="flex">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.email}
              </p>
            </div>
          )}

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="Enter Verification Code"
            className="p-2 border rounded input"
          />
          {errors.code && (
            <div className="flex">
              <TiWarningOutline color="#fa2b2b" className="mt-1 mr-2" />
              <p className="text-[12px] font-bold text-[#fa2b2b] mt-1 mb-1">
                {errors.code}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="p-2 font-bold text-center text-white rounded bg-custom-orange"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
