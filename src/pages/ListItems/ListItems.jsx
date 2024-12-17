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
      <p className='2xl:text-[27px] text-[24px] text-[#FF4C00] font-bold'>All Food List</p>
      <div className="overflow-x-auto">
        <table className="w-full mt-2  border-separate border-spacing-[6px]">
          <thead>
            <tr className="text-sm font-medium text-center bg-[#878787AB]">
              <th className="p-3 rounded-md">ID</th>
              <th className="p-3 rounded-md">Image</th>
              <th className="p-3 rounded-md">Name</th>
              <th className="p-3 rounded-md">Category</th>
              <th className="p-3 rounded-md">Description</th>
              <th className="p-3 rounded-md">Total Price</th>
              <th className="p-3 rounded-md">Discount</th>
              <th className="p-3 rounded-md">Delivery Fee</th>
              <th className="p-3 rounded-md">Delivery Duration</th>
              <th className="p-3 rounded-md">Custom Additions</th>
              <th className="p-3 rounded-md">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                className="transition-all duration-200 border-b hover:bg-yellow-200 text-sm font-medium  bg-[#D9D9D9]"
              >
                {/* ID Column */}
                <td className="p-3 rounded-md">
                  {String(index + 1).padStart(3, "0")}
                </td>

                <td className="items-center p-3 rounded-md">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="object-cover w-12 h-12 rounded"
                  />
                </td>
                <td className="p-3 text-center rounded-md">{item.name}</td>
                <td className="p-3 text-center rounded-md">{item.category}</td>
                <td className="p-3 text-center rounded-md">{item.description}</td>
                <td className="p-3 text-center text-green-600 rounded-md">
                  Rs. {item.totalPrice}
                </td>
                <td className="p-3 text-center rounded-md">{item.discountPercentage}%</td>
                <td className="p-3 text-center rounded-md">Rs. {item.deliveryFee}</td>
                <td className="p-3 text-center rounded-md">
                  Min-{item.deliveryDuration}
                </td>


                <td className="p-3 rounded-md">
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
                    <div className="p-2 text-center text-red-400 rounded-md">
                      No Custom Additions
                    </div>
                  )}
                </td>


                <td className="p-3 rounded-md">
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
