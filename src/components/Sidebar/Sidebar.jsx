import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaList,
  FaBell,
  FaChartLine,
  FaUserCog,
  FaPlus,
  FaThList,
  FaTools,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=" bg-white min-h-[100vh] min-w-[215px]">
      <div className="mt-4">
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `rounded-[10px] m-8 mb-[10px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaBell className="mr-2" /> Notifications
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `rounded-[10px] mx-8 mb-[10px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaPlus className="mr-2" /> Add Items
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `rounded-[10px] mx-8 mb-[10px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaThList className="mr-2" /> List Items
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `rounded-[10px] mx-8 mb-[-20px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaList className="mr-2" /> Order List
        </NavLink>

        <NavLink
          to="/revenue"
          className={({ isActive }) =>
            `rounded-[10px] m-8 mb-[-20px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaChartLine className="mr-2" /> Revenue
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `rounded-[10px] m-8 mb-[-20px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaUserCog className="mr-2" /> Admin Manage
        </NavLink>

        <NavLink
          to="/custom"
          className={({ isActive }) =>
            `rounded-[10px] m-8 mb-[-20px] flex items-center py-4 pl-2 cursor-pointer 
            ${isActive ? "bg-[#FF4C00] text-white" : "bg-[#D9D9D9] hover:bg-[#FF4C00] hover:text-white"}`
          }
        >
          <FaTools className="mr-2" /> Custom Update
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
