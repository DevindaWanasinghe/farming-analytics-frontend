import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./CustomToast.css";
import { IoMdCheckmarkCircle } from "react-icons/io";

const OrderList = () => {
  const [omgDetails,setomgDetails] = useState([
    {
      orderId: "ORD001",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS001",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Pending",
      payment: "Paid",
      cancel:false
    },

    {
      orderId: "ORD002",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS002",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Pending",
      payment: "unPaid",
      cancel:false
    },

    {
      orderId: "ORD003",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS003",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "In progress",
      payment: "Paid",
      cancel:true
    },

    {
      orderId: "ORD004",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS004",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Cancelled",
      payment: "Paid",
      cancel:false
    },

    {
      orderId: "ORD005",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS005",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Received",
      payment: "Paid",
      cancel:false
    },

    {
      orderId: "ORD006",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS006",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Pending",
      payment: "Paid",
      cancel:false
    },

    {
      orderId: "ORD007",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS007",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "In progress",
      payment: "Paid",
      cancel:false
    },
    {
      orderId: "ORD008",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      orderSummary: {
        id: "#ORDS008",
        dateAndTime: "2024-10-18",
        totalAmount: "Rs2500.50",
      },
      customerInfo: {
        name: "Chalitha Aluwihare",
        contact: "+94 074 030 7671",
        email: "chalithaaluwihare@gmail.com",
        address: "Block C",
      },
      items: [
        { name: "Burger x2", price: "Rs2500.00 each" },
        { name: "Fries x1", price: "Rs400.50" },
      ],
      subtotal: "Rs2900.50",
      status: "Pending",
      payment: "Paid",
      cancel:true
    },

  ]);


  const [expandedRow, setExpandedRow] = useState(null);
  const [status, setStatus] = useState("");
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaRegDotCircle color="#FF9500" size={20} />;
      case 'In progress':
        return <FaRegDotCircle color="#0095FF" size={20} />;
      case 'Delivered':
        return  <FaRegDotCircle color="#2F9B07" size={20} />;
      case 'Cancelled':
        return <FaRegDotCircle color="#D90E0E" size={20} />;
      case 'Received':
        return <FaRegDotCircle color="#9C27B0" size={20} />;
      default:
        return <FaRegDotCircle color="white" size={20} />;
    }
  };
  const updateState = (index, newState) => {

    if(newState === "Cancelled"){
      var isConfirmed = window.confirm("Are you sure you want to cancel this order?");
      if(isConfirmed){
        setomgDetails((prevDetails) =>
          prevDetails.map((order, i) =>
            i === index ? { ...order, status: newState } : order
          )
        );
      }else{
        return null;
      }
    }
    setomgDetails((prevDetails) =>
      prevDetails.map((order, i) =>
        i === index ? { ...order, status: newState } : order
      )
    );
    notify(newState)
  };

  //notifications 
  const notify = (newState) =>{
    switch(newState){
      case 'Pending':
          toast.warning(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #FF9500", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />}); break

      case 'In progress':
          toast.info(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #0095FF", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle size={20} />}); break

      case 'Delivered':
          toast.success(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #2F9B07", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />}); break

      case 'Cancelled':
          toast.error(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #D90E0E", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />}); break

      case 'Received':
          toast.dark(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          background:"white",
          border: "1px solid #9C27B0", 
          fontSize: "16px", 
          color:"#9C27B0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />,
          closeButton:true}); break

      default:
        return null;
    }
  } 
    
    
  
  return (
    <div className='w-full p-4 '>
      <p className='2xl:text-[27px] text-[24px] text-[#FF4C00] font-bold'>Order Management</p>
      <div>
        <div>
          <input
            className='w-full 2xl:h-[58px] h-[40px] pl-2 border-[#B2B2B2] border-2 rounded-md'
            type='text'
            placeholder='Search for orders'
          />
        </div>

        <div>
          <table className="w-full mt-2  border-separate border-spacing-[6px]">
            <thead>
              <tr className="text-sm font-medium text-center bg-[#878787AB]">
                <th className="p-3 rounded-md">Order ID</th>
                <th className="p-3 rounded-md">Customer Name</th>
                <th className="p-3 rounded-md">Order Time/dateAndTime</th>
                <th className="p-3 rounded-md">Order Status</th>
                <th className="p-3 rounded-md">Payment Status</th>
                <th className="p-3 rounded-md">Act</th>
              </tr>
            </thead>

            <tbody>
              {omgDetails.map((order, index) => {
               
                return (
                  <React.Fragment key={index}>
                    <tr className={`text-sm font-medium ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} `}>
                        <td className="p-3 rounded-md">{order.orderId}</td>
                        <td className="p-3 rounded-md">{order.customerName}</td>
                        <td className="p-3 rounded-md">{order.dateAndTime}</td>

                        <td className="p-3 rounded-md">
                        {order.status}
                            <div className="float-right w-[22px] h-[22px]">
                             {getStatusIcon(order.status)}
                          </div>  
                          
                        </td>

                        <td className="p-3 rounded-md ">
                          {order.payment}
                          <div className="float-right w-[22px] h-[22px]">
                            <FaRegDotCircle color={`${order.payment === "Paid" ? "#2F9B07":"#D90E0E"}`} size={20} />
                          </div>
                        </td>
                        <td className="p-3 text-center rounded-md">
                          <button onClick={() => { toggleRow(index); setStatus(order.status)}} className="flex items-center justify-center w-full">
                          {expandedRow === index ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                          </button>
                        </td>
                    </tr>

                    {expandedRow === index && (
                    <tr >
                      <td colSpan={6} >
                        <div className='flex justify-between '>
                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Order Summary</h4>
                              <div className='mt-1 ml-2'>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Order ID</p><p className='text-[12px] '>{order.orderSummary.id}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Order date</p><p className='text-[12px] '>{order.orderSummary.dateAndTime}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Total Amount</p><p className='text-[12px]'>{order.orderSummary.totalAmount}</p> </div>
                              </div>
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Customer Information</h4>
                              <div className='mt-1 ml-2'>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Name</p><p className='text-[12px] '>{order.customerInfo.name}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Contact Number</p><p className='text-[12px] '>{order.customerInfo.contact}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Email</p><p className='text-[12px]'>{order.customerInfo.email}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Place</p><p className='text-[12px]'>{order.customerInfo.address}</p> </div>
                              </div>
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Items Ordered</h4>
                            <div className='mt-1 ml-2'>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>{item.name}</p><p className='text-[12px] '>{item.price}</p> </div>
                                ))}
                                <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Subtotal</p><p className='text-[12px]'>{order.subtotal}</p> </div>
                            </div>
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Order Status</h4>
                            <div className='mt-1 ml-2'>
                              <div className='relative min-w-[120px]'>
                                <select className='min-w-[120px] h-[38px] pl-[36px] pr-2 rounded-md focus:outline-none font-semibold' 
                                value={status}
                                onChange={handleChange} >
                                  <option disabled={order.status === "Cancelled" ? true : false} value="Pending">Pending</option>
                                  <option disabled={order.status === "Cancelled" ? true : false} value="In progress">In progress</option>
                                  <option disabled={order.status === "Cancelled" ? true : false} value="Delivered">Delivered</option>
                                  <option disabled={order.status === "Cancelled" ? true : false} value="Cancelled">Cancelled</option>
                                  <option disabled={order.status === "Cancelled" ? true : false} value="Received">Received</option>
                                </select>
                                <div className='absolute transform -translate-y-1/2 top-1/2 left-3'>
                                {getStatusIcon(status)}
                                </div>
                              </div>
                              <button onClick={()=>{updateState(index,status)}} disabled={order.status === "Cancelled" ? true : false} className='flex mt-2 min-w-[144px] h-[38px] bg-[#FF4C00] p-2 rounded-md text-white items-center justify-center hover:bg-[#ff4d00b8]'>Save Changes</button>
                            </div>
                            
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Payment Status</h4>
                            <div className='w-[135px] h-[38px] bg-white rounded-md flex mt-1 ml-2'>
                                <FaRegDotCircle className='mt-[10px] ml-[12px]' color={`${order.payment === "Paid" ? "#2F9B07":"#D90E0E"}`} size={20} />
                                <p className='text-[15px] justify-center items-center flex ml-[10px] font-semibold'>{order.payment}</p>
                            </div>
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                    )}
                  </React.Fragment>
                  
                )
              })}
                  
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderList;
