import React, { useEffect } from "react";

const CustomPopup = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Auto-close after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 text-center transform scale-95 bg-white rounded-lg shadow-lg opacity-0 animate-popup">
        <h2 className="mb-2 text-lg font-semibold text-green-600">
          🎉 Success!
        </h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default CustomPopup;



//Use your own compononet this pop message customized

//import CustomPopup from "./components/CustomPopup";
//setShowPopup(true);

// return(

//     {/* Custom Popup */}
//     <CustomPopup
//         message="Food item added successfully!"
//         show={showPopup}
//         onClose={() => setShowPopup(false)}
//      />

// )
