import {jwtDecode} from "jwt-decode";


export const validateEmail = (email) => {
    if (!email) {
      return "Email cannot be empty.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "valid";
};
  

export const validateName = (name) => {
    if (!name) {
      return "Name cannot be empty.";
    }
    const nameRegex = /^[A-Za-z\s]{1,50}$/;
    if (!nameRegex.test(name)) {
      return "Name must contain only letters and spaces, and be no longer than 50 characters.";
    }
    return "valid";
};
  

export const validatePhone = (phone) => {
    if (!phone) {
      return "Phone number cannot be empty.";
    }
    const phoneRegex = /^(?:0|94)?(7[0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid Sri Lankan phone number";
    }
    return "valid";
};
  

export const validatePassword = (password) => {
    if (!password) {
      return "Password cannot be empty.";
    }
    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one letter and one number.";
    }
    return "valid";
};
  
export const validateNic = (nic) => {
  if (!nic) {
    return "NIC number cannot be empty.";
  }

  // Check for old NIC format (9 digits followed by V or X)
  const oldNICRegex = /^\d{9}[VXvx]$/;

  // Check for new NIC format (12 digits)
  const newNICRegex = /^\d{12}$/;

  if (!oldNICRegex.test(nic) && !newNICRegex.test(nic)) {
    return "Invalid NIC format. Use 9 digits followed by V or X, or 12 digits.";
  }

  return "valid";
};

export const isTokenValid = (token) => {
  if (!token) return false; // No token found

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Check if expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // Token is invalid
  }
};