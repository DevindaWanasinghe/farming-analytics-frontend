import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddItems from "./pages/AddItems/AddItems";
import ListItems from "./pages/ListItems/ListItems";
import OrderList from "./pages/OrderList/OrderList";
import Notification from "./pages/Notification/Notification";
import Revenue from "./pages/Revenue/Revenue";
import AdminManage from "./pages/AdminManage/AdminManage";
import CustomUpdate from "./pages/CustomUpdate/CustomUpdate";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <div className="">
      <ToastContainer/>
      <Navbar />
      <div className="flex bg-white">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItems />} />
          <Route path="/list" element={<ListItems />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/notifications" element={<Notification/>} />
          <Route path="/revenue" element={<Revenue/>} />
          <Route path="/admin" element={<AdminManage/>} />
          <Route path="/custom" element={<CustomUpdate/>} />





        </Routes>
      </div>
    </div>
  );
};

export default App;
