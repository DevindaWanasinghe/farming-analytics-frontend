import React, { useState, useEffect } from "react";

const CustomizedFoodItems = ({
  data,
  setData,
  customizedItems,
  setCustomizedItems,
  price,
  discountPercentage,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  // Local state for extra nutrition fields for the customized item
  const [itemExtraNutrition, setItemExtraNutrition] = useState([]);

  // Generic handler for customized item input fields
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Functions to manage extra nutrition for the customized item
  const addItemExtraNutrition = () => {
    setItemExtraNutrition([...itemExtraNutrition, { key: "", value: "" }]);
  };

  const handleItemExtraNutritionChange = (index, field, value) => {
    const updated = [...itemExtraNutrition];
    updated[index][field] = value;
    setItemExtraNutrition(updated);
  };

  const removeItemExtraNutrition = (index) => {
    const updated = itemExtraNutrition.filter((_, i) => i !== index);
    setItemExtraNutrition(updated);
  };

  // Add a customized food item with basic and extra nutrition details
  const handleAddItem = () => {
    if (
      data.itemName &&
      data.itemName.trim() &&
      data.itemPrice &&
      data.itemPrice.toString().trim()
    ) {
      const newItem = {
        itemPart: data.itemPart || "-",
        itemName: data.itemName,
        itemPrice: Number(data.itemPrice),
        // Basic nutrition details
        itemCalories: Number(data.itemCalories),
        itemProtein: Number(data.itemProtein),
        itemFat: Number(data.itemFat),
        itemCarbs: Number(data.itemCarbs),
        // Extra nutrition details (dynamic additional nutrition info)
        extraNutrition: itemExtraNutrition,
      };

      // Update customized items state
      setCustomizedItems((prevItems) => [...prevItems, newItem]);

      // Clear customized item input fields and extra nutrition state
      setData((prevData) => ({
        ...prevData,
        itemPart: "",
        itemName: "",
        itemPrice: "",
        itemCalories: "",
        itemProtein: "",
        itemFat: "",
        itemCarbs: "",
      }));
      setItemExtraNutrition([]);
    } else {
      alert("Item name and price are required!");
    }
  };

  // Remove a customized food item
  const handleRemoveItem = (index) => {
    setCustomizedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Calculate total price (including discount) for customized items
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
  }, [price, discountPercentage, customizedItems, setData]);

  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-700">
        Customized Food Items (Optional)
      </h2>

      {/* Customized Item Input Section */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-4">
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
        </div>
        {/* Basic Nutrition Inputs */}
        <div className="grid grid-cols-4 gap-4">
          <input
            type="number"
            name="itemCalories"
            placeholder="Calories"
            value={data.itemCalories}
            onChange={onChangeHandler}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="itemProtein"
            placeholder="Protein"
            value={data.itemProtein}
            onChange={onChangeHandler}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="itemFat"
            placeholder="Fat"
            value={data.itemFat}
            onChange={onChangeHandler}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="itemCarbs"
            placeholder="Carbs"
            value={data.itemCarbs}
            onChange={onChangeHandler}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Additional Nutrition Inputs for Customized Item */}
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h3 className="mb-2 text-lg font-bold text-gray-700">
            Additional Nutrition for Customized Item
          </h3>
          {itemExtraNutrition.map((entry, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Nutrition Item"
                value={entry.key}
                onChange={(e) =>
                  handleItemExtraNutritionChange(index, "key", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Value"
                value={entry.value}
                onChange={(e) =>
                  handleItemExtraNutritionChange(index, "value", e.target.value)
                }
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => removeItemExtraNutrition(index)}
                className="px-2 py-1 text-white bg-red-500 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItemExtraNutrition}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add More Nutrition
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 text-white bg-[#FF4C00] rounded-lg hover:bg-orange-400"
        >
          Add
        </button>
      </div>

      {/* Display Total Price */}
      <div className="mt-2 text-green-600">
        <span>Total Price: </span>
        <strong>Rs. {totalPrice}</strong>
      </div>

      {/* Customized Items Table */}
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
                <th className="p-2">Calories</th>
                <th className="p-2">Protein</th>
                <th className="p-2">Fat</th>
                <th className="p-2">Carbs</th>
                <th className="p-2">Extra Nutrition</th>
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
                  <td className="p-2 text-gray-600">{item.itemCalories}</td>
                  <td className="p-2 text-gray-600">{item.itemProtein}</td>
                  <td className="p-2 text-gray-600">{item.itemFat}</td>
                  <td className="p-2 text-gray-600">{item.itemCarbs}</td>
                  <td className="p-2 text-gray-600">
                    {item.extraNutrition && item.extraNutrition.length > 0 ? (
                      <ul className="ml-4 list-disc">
                        {item.extraNutrition.map((entry, idx) => (
                          <li key={idx}>
                            {entry.key}: {entry.value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "N/A"
                    )}
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
