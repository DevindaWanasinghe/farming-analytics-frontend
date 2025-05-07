import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  BarElement,
  PieController,
  ArcElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PieController,
  ArcElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);



// Define harvest data for each paddy field separately
const fieldData = {
  "Palu Gaha Kotuwa": {
    labels: ["Palu Gaha Kotuwa"],
    datasets: [
      {
        label: "Pokuru Samba",
        data: [1.75], // Example data points
        backgroundColor: "rgba(255, 205, 86, 0.6)",
      },
    ],
  },
  "Kalu Mahaththya kubura": {
    labels: ["Kalu Mahaththya kubura"],
    datasets: [
      {
        label: "Kiri Samba",
        data: [1],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Samba",
        data: [0.25],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  },
  "Andu wela": {
    labels: ["Andu wela"],
    datasets: [
      {
        label: "Pokuru Samba",
        data: [0.75],
        backgroundColor: "rgba(255, 205, 86, 0.6)",
      },
    ],
  },
};





// Color and axis mapping for each rice type (adjust as needed)
const colorMapping = {
  "Pokuru Samba": "rgba(255, 205, 86, 0.6)",
  "Kiri Samba": "rgba(75, 192, 192, 0.6)",
  "Samba": "rgba(255, 159, 64, 0.6)",
};

// const axisMapping = {
//   "Pokuru Samba": "y2",
//   "Kiri Samba": "y1",
//   "Samba": "y1",
// };

// Function to get a summary view for "All" fields
const getSummaryData = () => {
  // Labels are the paddy field names
  const fields = Object.keys(fieldData);

  // Gather all unique rice types across the fields
  const uniqueRiceTypes = new Set();
  fields.forEach((field) => {
    fieldData[field].datasets.forEach((ds) => uniqueRiceTypes.add(ds.label));
  });
  const riceTypes = Array.from(uniqueRiceTypes);

  // For each rice type, create a dataset where each data point corresponds to that field.
  const summaryDatasets = riceTypes.map((riceType) => {
    const data = fields.map((field) => {
      // Use the first data point from the dataset matching the rice type; if not present, use 0.
      const ds = fieldData[field].datasets.find((d) => d.label === riceType);
      return ds ? ds.data[0] : 0;
    });
    return {
      label: riceType,
      data,
      backgroundColor: colorMapping[riceType] || "rgba(0,0,0,0.3)",
      yAxisID: "y",
    };
  });

  return {
    labels: fields,
    datasets: summaryDatasets,
  };
};


// Function to return either an individual field’s data or the summary data
const filterData = (field) => {
  if (field === "All") {
    return getSummaryData();
  } else {
    return fieldData[field] || { labels: [], datasets: [] };
  }
};


function decimalToFraction(value) {
  const whole = Math.floor(value);
  const decimal = +(value - whole).toFixed(2);

  const fractionMap = {
    0.25: "¼",
    0.5: "½",
    0.75: "¾",
  };

  // If it's an exact whole number, return it as is
  if (decimal === 0) return whole.toString();

  // If it's less than 1 (e.g., 0.25), return just the fraction
  if (whole === 0) return fractionMap[decimal] || value.toString();

  // For values like 1.25, 2.75 etc.
  return `${whole}${fractionMap[decimal] || decimal.toString()}`;
}







const options = {
  scales: {
    y: {
      type: "linear",
      position: "left",
      title: {
        display: true,
        text: "Land (acres)",
      },
      ticks: {
        stepSize: 0.25,
        callback: function (value) {
          if (value >= 0 && value <= 10) {
            return decimalToFraction(value);
          }
          return value;
        },
      },
    },
  },
};





const Dashboard = () => {
  const [selectedField, setSelectedField] = useState("All");
  const currentData = filterData(selectedField);


  // Other chart data for the dashboard
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales Revenue (LKR)",
        data: [
          150000, 170000, 140000, 200000, 180000, 220000,
          210000, 190000, 230000, 240000, 220000, 250000,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const costData = {
    labels: ["Seeds", "Fertilizer", "Labor", "Water/Irrigation", "Others"],
    datasets: [
      {
        label: "Cost Breakdown (%)",
        data: [20, 25, 30, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const profitData = {
    labels: ["Maha", "Yala"],
    datasets: [
      {
        label: "Profit (LKR)",
        data: [120000, 90000],
        backgroundColor: [
          "rgba(46, 204, 113, 0.6)",
          "rgba(241, 196, 15, 0.6)",
        ],
      },
    ],
  };

  const costTimelineData = {
    labels: [
      "Preparation",
      "Planting",
      "Maintenance",
      "Harvesting",
      "Post-Harvest",
    ],
    datasets: [
      {
        label: "Cumulative Costs (LKR)",
        data: [50000, 150000, 250000, 350000, 400000],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 mt-10 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Rice Farming Analytics Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Harvest Yield Chart with Field Selection */}
      {/* Harvest Yield Chart with Field Selection */}
      <div>
          <select
            className="p-2 mb-4 border rounded"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="All">All Paddy Fields Summary</option>
            <option value="Palu Gaha Kotuwa">Palu Gaha Kotuwa</option>
            <option value="Kalu Mahaththya kubura">Kalu Mahaththya kubura</option>
            <option value="Andu wela">Andu wela</option>
            {/* Add more options as needed */}
          </select>
          <Card>
            <CardContent>
              <h2 className="mb-4 text-xl font-semibold">
                Harvest Yield by Rice Type & Season
              </h2>
              <Bar data={currentData} options={options} />
            </CardContent>
          </Card>
        </div>


        {/* Sales Revenue Chart */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">
              Monthly Sales Revenue
            </h2>
            <Line data={salesData} />
          </CardContent>
        </Card>

        {/* Cost Breakdown Chart */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">
              Cost Breakdown of Rice Farming
            </h2>
            <Pie data={costData} />
          </CardContent>
        </Card>

        {/* Profit Analysis Chart */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">
              Profit Analysis per Season
            </h2>
            <Bar data={profitData} />
          </CardContent>
        </Card>

        {/* Cost Timeline Analysis Chart */}
        <Card className="col-span-2">
          <CardContent>
            <h2 className="mb-4 text-xl font-semibold">
              Cumulative Cost Timeline
            </h2>
            <Line data={costTimelineData} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytical Conclusions */}
      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">Detailed Analysis</h2>
        <ul className="ml-6 list-disc">
          <li>
            <strong>Harvest Yield:</strong> Yields vary by rice type and season, which can inform the choice of variety for each season.
          </li>
          <li>
            <strong>Sales Revenue:</strong> Monthly revenue trends help in identifying peak sales periods.
          </li>
          <li>
            <strong>Cost Breakdown:</strong> Understanding the cost distribution (seeds, fertilizer, labor, etc.) is essential for effective budgeting.
          </li>
          <li>
            <strong>Profit Analysis:</strong> Comparing profits between Maha and Yala seasons highlights areas where efficiency can be improved.
          </li>
          <li>
            <strong>Cumulative Costs:</strong> Tracking costs from preparation to post-harvest assists in planning and optimizing cash flow.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
