import { useState, useEffect } from "react";
import React from "react";
//import axios from "axios";

const CustomizedFoodItems = ({
  data,
  setData,
  customizedItems,
  setCustomizedItems,
  price,
  discountPercentage,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddItem = async () => {
    if (data.itemName && data.itemName.trim() && data.itemPrice && data.itemPrice.trim()) {
      const newItem = {
        itemPart: data.itemPart || "-",
        itemName: data.itemName,
        itemPrice: data.itemPrice,
      };

      try {
        // Update local state
        setCustomizedItems((prevItems) => [...prevItems, newItem]);

        // Clear fields
        setData((prevData) => ({
          ...prevData,
          itemPart: "",
          itemName: "",
          itemPrice: "",
        }));
      } catch (error) {
        console.error("Error sending item to API:", error);
      }
    } else {
      alert("Item name and price are required!");
    }
  };

  const handleRemoveItem = (index) => {
    setCustomizedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   console.log("Customized Items: ", customizedItems);
  // }, [customizedItems]);

  // Calculate total price
  useEffect(() => {
    const basePrice = Number(price) || 0;
    const customizedItemsPrice = customizedItems.reduce((total, item) => {
      return total + (Number(item.itemPrice) || 0);
    }, 0);
    const totalBeforeDiscount = basePrice + customizedItemsPrice;
    const discount =
      (totalBeforeDiscount * (Number(discountPercentage) || 0)) / 100;
    const finalPrice = totalBeforeDiscount - discount;

    setTotalPrice(finalPrice);

    setData((prevData) => ({
      ...prevData,
      totalPrice: finalPrice, // Pass totalPrice to parent
    }));
  }, [price, discountPercentage, customizedItems]);

  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-700">
        Customized Food Items (Optional)
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="itemPart"
          placeholder="Custom Additions"
          value={data.itemPart}
          onChange={onChangeHandler}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="itemName"
          placeholder="Options"
          value={data.itemName}
          onChange={onChangeHandler}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          name="itemPrice"
          placeholder="Price"
          value={data.itemPrice}
          onChange={onChangeHandler}
          className="w-[50%] p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Display Total Price */}
      <div className="mt-2 text-green-600">
        <span >Total Price:</span>
        <span >  <strong>Rs. {totalPrice}</strong></span>
      </div>

      {customizedItems.length > 0 && (
        <div className="p-4 mt-4 border border-gray-300 rounded-lg">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Customized Items Table
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Custom Additions</th>
                <th className="p-2">Options</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customizedItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-gray-600">{item.itemPart}</td>
                  <td className="p-2 text-gray-600">{item.itemName}</td>
                  <td className="p-2 font-medium text-gray-800">
                    ${item.itemPrice}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="px-3 py-1 text-white bg-red-500 rounded-lg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomizedFoodItems;
