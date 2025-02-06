import React from "react";
import HomePage from "./pages/Home/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
        <HomePage />
    </div>
 
  );
};

export default App;
