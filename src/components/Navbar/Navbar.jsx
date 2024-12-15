// components/Navbar.js
import React from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="  p-4 flex justify-between items-center max-h-[55px] bg-[#FF4C00]">
      <img className=" w-[70px] h-7" src={assets.logo} alt="" />

      <button className="bg-white text-black px-4 py-2 rounded hover:bg-[#D9D9D9]">
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
