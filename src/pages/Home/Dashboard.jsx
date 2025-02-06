import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4 ml-56">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
