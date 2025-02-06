import React, { useState } from "react";
import { Route, Routes ,Outlet} from "react-router-dom";
import Dashboard from "../Home/Dashboard";
import Login from "../Auth/Login";
import Signin from "../Auth/Signin";
import Protected from "../Auth/Protected";
import VerifyEmail from "../Auth/VerifyEmail";
import Controllpanel from "../ControllPannel/ControllPannel"
import AddItems from "../AddItems/AddItems";
import ListItems  from "../ListItems/ListItems";
import OrderList from "../OrderList/OrderList";
import Notification  from "../Notification/Notification";
import Revenue from "../Revenue/Revenue";
import AdminManage from "../AdminManage/AdminManage";
import CustomUpdate from "../CustomUpdate/CustomUpdate";


const HomePage = () => {

  return (
    <div>
        
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verifymail" element={<VerifyEmail />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard/*" element={<Protected />}>
        <Route path="" element={<Dashboard />}>
          <Route index element={<Controllpanel />} />
          <Route path="add" element={<AddItems />} />
          <Route path="list" element={<ListItems />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="admin" element={<AdminManage />} />
          <Route path="custom" element={<CustomUpdate />} />
        </Route>
      </Route>
</Routes>

    </div>

  );
};

export default HomePage;
