import React, { useEffect, useMemo, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./CustomToast.css";
import { IoMdCheckmarkCircle } from "react-icons/io";
import api from "../../services/api.js";
import { io } from "socket.io-client";

const OrderList = () => {
  const [omgDetails,setomgDetails] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const socket = useMemo(() => io("http://localhost:3001"), []);

  


  const fetchOrders = async () => {
    try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("User is not authenticated.");

        const response = await api.get("order/getorders", {
            headers: { Authorization: `Bearer ${token}` }
        });
        //console.log(response)
        if (response.status === 200 && response.data.status === "sucsess") {
          setomgDetails(response.data.data);
        } else {
            throw new Error("Failed to retrieve orders.");
        }
    } catch (error) {
        console.error("API Error:", error.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  const handleNewOrder = (newOrder) => {
    console.log("New order received:", newOrder);
    fetchOrders(); // Fetch updated orders
  };

  socket.on("orderPlaced", handleNewOrder);

  return () => {
    socket.off("orderPlaced", handleNewOrder); // Cleanup: Remove event listener
  };
}, []);


useEffect(()=>{
  fetchOrders();
},[]);

const updateOrderStatus = async (orderId, status) => {
    try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("User is not authenticated.");

        const response = await api.put(
            `/order/${orderId}/status`,  // RESTful API path
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200 && response.data.status === "sucsess") {
            fetchOrders(); // Refresh order list
        } else {
            throw new Error("Failed to update order status.");
        }
    } catch (error) {
        console.error("API Error:", error.message);
    } finally {
        setLoading(false);
    }
};

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

  const filteredData = omgDetails.filter((data) => {
    
    const matchesSearch = data.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          data.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          data.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          data.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          data.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesDateRange = (!startDate || !endDate) || (new Date(data.createdAt) >= new Date(startDate) &&
                            new Date(data.createdAt) <= new Date(endDate));

    return matchesSearch && matchesDateRange;
  });

  const handleReset = ()=>{
    setStartDate(""); 
    setEndDate("");   
    setSearchQuery("");
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
        },icon: <IoMdCheckmarkCircle  size={20} /> ,autoClose: 1000}); break

      case 'In progress':
          toast.info(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #0095FF", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle size={20} />,autoClose: 1000}); break

      case 'Delivered':
          toast.success(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #2F9B07", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />,autoClose: 1000}); break

      case 'Cancelled':
          toast.error(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          border: "1px solid #D90E0E", 
          fontSize: "16px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />,autoClose: 1000}); break

      case 'Received':
          toast.dark(`Status updated to ${newState}!`,{ style: {
          borderRadius: "8px", 
          background:"white",
          border: "1px solid #9C27B0", 
          fontSize: "16px", 
          color:"#9C27B0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },icon: <IoMdCheckmarkCircle  size={20} />,autoClose: 1000,
          closeButton:true}); break

      default:
        return null;
    }
  } 
  
  
  return (
    <div className='w-full p-4 mt-10'>
      <p className='2xl:text-[27px] text-[24px] text-[#FF4C00] font-bold'>Order Management</p>
      <div className=''>
        <div className='flex'>
          <input
            className='w-full 2xl:h-[58px] h-[40px] pl-2 border-[#B2B2B2] border-2 rounded-l-md border-r-0 focus:outline-none'
            type='text'
            placeholder='Search for orders'
            onChange={(e)=>{setSearchQuery(e.target.value)}}
          />

      <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 pt-[3px] pb-[1px] px-[1px] md:flex-row border-[#B2B2B2] border-2 rounded-r-md border-l-0">
        <div className="flex flex-col">
          <input
            type="date"
            id="from-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-[1px] py-[1px] border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="date"
            id="to-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-[1px] py-[1px] border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleReset}
          className="px-[4px] mr-2 py-[2px] font-medium text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
    </div>
  
        </div>

        <div>
          <table className="w-full mt-2  border-separate border-spacing-[6px]">
            <thead>
              <tr className="text-sm font-medium text-center bg-[#878787AB]">
                <th className="p-3 rounded-md">Order ID</th>
                <th className="p-3 rounded-md">Customer Name</th>
                <th className="p-3 rounded-md">Order Time/date</th>
                <th className="p-3 rounded-md">Order Status</th>
                <th className="p-3 rounded-md">Payment Status</th>
                <th className="p-3 rounded-md">Act</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.map((order, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className={`text-sm font-medium ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} `}>
                        <td className="p-3 rounded-md">{order.orderNo}</td>
                        <td className="p-3 rounded-md">{order.username}</td>
                        <td className="p-3 rounded-md">{order.createdAt.split("T")[0]}{" | "}{order.createdAt.split("T")[1]?.split(".")[0]}</td>

                        <td className="p-3 rounded-md">
                        {order.status}
                            <div className="float-right w-[22px] h-[22px]">
                             {getStatusIcon(order.status)}
                          </div>  
                          
                        </td>

                        <td className="p-3 rounded-md ">
                          {order.paymentMethod === "Cash" ? "unpaid" : "paid" }
                          <div className="float-right w-[22px] h-[22px]">
                            <FaRegDotCircle color={`${order.paymentMethod === "cash" ? "#2F9B07":"#D90E0E"}`} size={20} />
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
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Order ID</p><p className='text-[12px]  text-right'>{order.orderNo}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Order date</p><p className='text-[12px] text-right'>{order.createdAt.split("T")[0]} </p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Total Amount</p><p className='text-[12px]  text-right'>{order.totalAmount}</p> </div>
                              </div>
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Customer Information</h4>
                              <div className='mt-1 ml-2'>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Name</p><p className='text-[12px] '>{order.username}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Contact Number</p><p className='text-[12px] '>{order.contactNo}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Email</p><p className='text-[12px]'>{order.email}</p> </div>
                                  <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Place</p><p className='text-[12px]'>{order.deliveryAddress}</p> </div>
                              </div>
                          </div>

                          <div className={`p-1 border-2 border-[#B2B2B2] ${order.status === "Cancelled" ? "bg-[#E58C8C]" : "bg-[#D9D9D9]"} w-full `}>
                            <h4 className='text-[15px] font-bold'>Items Ordered</h4>
                            <div className='mt-1 ml-2'>
                                {order.items.map((item, idx) => (
                                  <div key={idx} className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>{item.name}</p><p className='text-[12px] '>({item.selectedSides.length !== 0 ? item.selectedSides.map((ss)=> `+${ss.part}`) : "" }) * {item.count}</p> </div>
                                  
                                ))}
                                <div className='flex justify-between'><p className='text-[12px] pr-[2px] font-semibold'>Subtotal</p><p className='text-[12px] font-semibold'>{order.subtotal}</p> </div>
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
                              <button onClick={()=>{updateState(index,status); updateOrderStatus(order._id)}} disabled={order.status === "Cancelled" ? true : false} className='flex mt-2 min-w-[144px] h-[38px] bg-[#FF4C00] p-2 rounded-md text-white items-center justify-center hover:bg-[#ff4d00b8]'>Save Changes</button>
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
