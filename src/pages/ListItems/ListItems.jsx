import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListItems = () => {
  const url = "http://localhost:3001";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }

    console.log(response.data.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">All Foods List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Image</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Category</th>
              <th className="px-4 py-2 text-center">Description</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Delivery Fee</th>
              <th className="px-4 py-2 text-center">Delivery Duration</th>
              <th className="px-4 py-2 text-center">Custom Additions</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                className="transition-all duration-200 border-b hover:bg-gray-100"
              >
                {/* ID Column */}
                <td className="px-4 py-2 font-semibold text-center text-gray-700">
                  {String(index + 1).padStart(3, "0")}
                </td>

                <td className="px-4 py-2">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="object-cover w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2 font-semibold text-green-600">
                  ${item.price}
                </td>
                <td className="px-4 py-2 text-center">{item.deliveryFee}</td>
                <td className="px-4 py-2 text-center">
                  {item.deliveryDuration}
                </td>


                <td className="px-4 py-2">
                  {item.customizedItems && item.customizedItems.length > 0 ? (
                    Array.isArray(item.customizedItems) ? (
                      // If customizedItems is an array of objects
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {item.customizedItems.map((customItem, i) => (
                          <div
                            key={i}
                            className="p-2 border rounded-md shadow-sm bg-gray-50 hover:shadow-md"
                          >
                            <p className="text-sm font-medium text-gray-700">
                              <span className="font-bold text-gray-900">
                                Part:
                              </span>{" "}
                              {customItem.itemPart}
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              <span className="font-bold text-gray-900">
                                Name:
                              </span>{" "}
                              {customItem.itemName}
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              <span className="font-bold text-gray-900">
                                Price:
                              </span>{" "}
                              <span className="text-green-600">
                                ${customItem.itemPrice}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // If customizedItems is a single object
                      <div className="p-2 border rounded-md shadow-sm bg-gray-50 hover:shadow-md">
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-bold text-gray-900">Part:</span>{" "}
                          {item.customizedItems.itemPart}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-bold text-gray-900">Name:</span>{" "}
                          {item.customizedItems.itemName}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-bold text-gray-900">
                            Price:
                          </span>{" "}
                          <span className="text-green-600">
                            ${item.customizedItems.itemPrice}
                          </span>
                        </p>
                      </div>
                    )
                  ) : (
                    // Empty State
                    <div className="p-2 text-red-400 rounded-md">
                      No Custom Additions
                    </div>
                  )}
                </td>


                <td className="px-4 py-2">
                  <div className="flex flex-col items-center space-y-2">
                    <button className="w-full px-3 py-1 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="w-full px-3 py-1 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListItems;
