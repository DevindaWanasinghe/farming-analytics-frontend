import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample orders data
  const orders = [
    {
      orderId: "ORD001",
      customerName: "W.B.W.R.M.M.S. Aluwihare",
      dateAndTime: "Sat Oct 19, 2024 7:43",
      totalAmount: 2500.5,
      status: "Pending",
      payment: "Paid",
    },
    {
      orderId: "ORD002",
      customerName: "Chalitha Aluwihare",
      dateAndTime: "Sat Oct 20, 2024 8:30",
      totalAmount: 2900.5,
      status: "Completed",
      payment: "Unpaid",
    },
  ];

  // Sample reviews data
  const reviews = [
    {
      customerName: "John Doe",
      rating: 4,
      comment: "Great service! The food was amazing and delivered on time.",
    },
    {
      customerName: "Jane Smith",
      rating: 5,
      comment: "Excellent experience! Will definitely order again.",
    },
    {
      customerName: "Michael Johnson",
      rating: 3,
      comment: "Good food but delivery took longer than expected.",
    },
  ];

  // Revenue Chart Data
  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue (LKR)",
        data: [12000, 15000, 10000, 22000, 18000, 25000],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  // Orders Chart Data
  const orderData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [30, 50, 40, 70, 60, 90],
        backgroundColor: ["#4CAF50", "#FFA500", "#2196F3", "#FF5733", "#9C27B0", "#E91E63"],
      },
    ],
  };

  // Review Chart Data (as a line chart)
  const reviewData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "User Reviews",
        data: [3, 1, 5, 8, 10],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 mt-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">Revenue Overview</h2>
            <Line data={revenueData} />
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">Order Statistics</h2>
            <Bar data={orderData} />
          </CardContent>
        </Card>

        {/* User Reviews Chart */}
        <Card className="col-span-2">
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">User Reviews Overview</h2>
            <Line data={reviewData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
