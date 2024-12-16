import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";

const OrderList = () => {
  const omgDetails = [
    {
      orderId: "ORD001",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "pending",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD002",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "pending",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD003",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "In progress",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD004",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "pending",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD005",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "Delivered",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD006",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "Cancelled",
      paymentStatus: "paid"
    },
    {
      orderId: "ORD007",
      customerName: "W.B.W.R.M.M.S.Aluwihare",
      dateAndTime: "Sat Oct 19,2024 7:43",
      orderStatus: "Received",
      paymentStatus: "paid"
    }
  ];

  return (
    <div className='w-full p-4'>
      <p className='2xl:text-[27px] text-[24px] text-[#FF4C00] font-bold'>Order Management</p>
      <div>
        <div>
          <input
            className='w-full 2xl:h-[58px] h-[40px] pl-2 border-black border-2 rounded-md'
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
                <th className="p-3 rounded-md">Order Time/Date</th>
                <th className="p-3 rounded-md">Order Status</th>
                <th className="p-3 rounded-md">Payment Status</th>
                <th className="p-3 rounded-md">Act</th>
              </tr>
            </thead>

            <tbody>
              {omgDetails.map((order, index) => {
                let orderStatusIcon;
                switch (order.orderStatus) {
                  case "pending":
                    orderStatusIcon = (
                      <div className="float-right w-[22px] h-[22px]">
                        <FaRegDotCircle className='font-extrabold ' color="#FF9500" size={20} />
                      </div>
                    );
                    break;
                  case "In progress":
                    orderStatusIcon = (
                      <div className="float-right w-[22px] h-[22px]">
                        <FaRegDotCircle color="#0095FF" size={20} />
                      </div>
                    );
                    break;
                  case "Delivered":
                    orderStatusIcon = (
                      <div className="float-right w-[22px] h-[22px]">
                        <FaRegDotCircle color="#2F9B07" size={20} />
                      </div>
                    );
                    break;
                  case "Cancelled":
                    orderStatusIcon = (
                      <div className="float-right w-[22px] h-[22px]">
                        <FaRegDotCircle color="#D90E0E" size={20} />
                      </div>
                    );
                    break;
                  case "Received":
                    orderStatusIcon = (
                      <div className="float-right w-[22px] h-[22px]">
                        <FaRegDotCircle color="#FF4C00" size={20} />
                      </div>
                    );
                    break;
                  default:
                    orderStatusIcon = null;
                    break;
                }

                return (
                  <tr key={index} className="text-sm font-medium  bg-[#D9D9D9]">
                    <td className="p-3 rounded-md">{order.orderId}</td>
                    <td className="p-3 rounded-md">{order.customerName}</td>
                    <td className="p-3 rounded-md">{order.dateAndTime}</td>

                    <td className="p-3 rounded-md">
                      {order.orderStatus} {orderStatusIcon}
                    </td>

                    <td className="p-3 rounded-md ">{order.paymentStatus}</td>
                    <td className="p-3 text-center rounded-md">
                      <button className="flex items-center justify-center w-full">
                        <IoIosArrowDown size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
