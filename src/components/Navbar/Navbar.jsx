// components/Navbar.js
import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("login", false);

    navigate('/');
    window.location.reload();

  };
  const isLoggedIn = localStorage.getItem("login") === "true" ? true : false;
  return (
    <div className="  p-4 flex justify-between items-center max-h-[55px] bg-[#FF4C00] fixed  w-full  z-50">  	
      <img className=" w-[70px] h-7" src={assets.logo} alt="" />

      {!isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="bg-white text-black px-4 py-2 rounded hover:bg-[#D9D9D9]"
                    >
                      Logout      
                      
                    </button>
                ) : (
                    <button
                      onClick={navigate('/')}
                      className="bg-white text-black px-4 py-2 rounded hover:bg-[#D9D9D9]"
                    >
                      Login
                    </button>
                )}
    </div>
  );
};

export default Navbar;
