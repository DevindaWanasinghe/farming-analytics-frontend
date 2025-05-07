import React, { useState } from "react";
import { assets } from "../../assets/assets";
import CustomizedFoodItems from "./CustomizedFoodItems";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomPopup from "../../components/Common/CustomPopup";
import OfferSection from "./OfferSection";

const AddItems = () => {
  const url = "http://localhost:3001";
  const navigate = useNavigate();

  // Main states for product info and image
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza",
    deliveryFee: "",
    deliveryDuration: "20",
    hasOffer: false,
    discountPercentage: 0,
    discountPrice: 0,
    totalPrice: 0,
    // Temporary fields for adding customized food items:
    itemPart: "",
    itemName: "",
    itemPrice: "",
    itemCalories: "",
    itemProtein: "",
    itemFat: "",
    itemCarbs: "",
  });

  // State for main food nutrition (main product)
  const [mainNutrition, setMainNutrition] = useState({
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  // New state for additional nutrition info (if there is more)
  const [extraNutrition, setExtraNutrition] = useState([]);

  // State for customized items array
  const [customizedItems, setCustomizedItems] = useState([]);

  // Generic onChange for product fields (including temporary customized item fields)
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // onChange handler for main nutrition inputs
  const onMainNutritionChange = (event) => {
    const { name, value } = event.target;
    setMainNutrition((prev) => ({ ...prev, [name]: value }));
  };

  // Functions for additional nutrition info
  const addExtraNutrition = () => {
    setExtraNutrition([...extraNutrition, { key: "", value: "" }]);
  };

  const handleExtraNutritionChange = (index, field, value) => {
    const updated = [...extraNutrition];
    updated[index][field] = value;
    setExtraNutrition(updated);
  };

  const removeExtraNutrition = (index) => {
    const updated = extraNutrition.filter((_, i) => i !== index);
    setExtraNutrition(updated);
  };

  // Function to update discount details
  const handleDiscountChange = (percentage, price) => {
    setData((prevData) => ({
      ...prevData,
      discountPercentage: percentage,
      discountPrice: price,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("deliveryFee", Number(data.deliveryFee));
    formData.append("deliveryDuration", Number(data.deliveryDuration));
    formData.append("hasOffer", data.hasOffer ? "true" : "false");
    formData.append("discountPercentage", data.discountPercentage);
    formData.append("discountPrice", data.discountPrice);
    formData.append("image", image);
    formData.append("totalPrice", Number(data.totalPrice));

    // Append nutrition information for the main food item
    formData.append("mainNutrition", JSON.stringify(mainNutrition));

    // Append additional nutrition details if available
    formData.append("extraNutrition", JSON.stringify(extraNutrition));

    // Append customized items array (including each item's nutrition info)
    formData.append("customizedItems", JSON.stringify(customizedItems));

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        // Reset states after successful submission
        setData({
          name: "",
          description: "",
          price: "",
          category: "Pizza",
          deliveryFee: "",
          deliveryDuration: "20",
          hasOffer: false,
          discountPercentage: 0,
          discountPrice: 0,
          totalPrice: 0,
          itemPart: "",
          itemName: "",
          itemPrice: "",
          itemCalories: "",
          itemProtein: "",
          itemFat: "",
          itemCarbs: "",
        });
        setMainNutrition({
          calories: "",
          protein: "",
          fat: "",
          carbs: "",
        });
        setExtraNutrition([]);
        setImage(false);
        setCustomizedItems([]);

        toast.success(response.data.message);
        setShowPopup(true);

        setTimeout(() => {
          navigate(0);
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Calculate customized nutrition totals from customizedItems array
  // (This function is kept for your customized items if needed)
  const calculateCustomizedNutrition = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    customizedItems.forEach((item) => {
      totalCalories += Number(item.calories || 0);
      totalProtein += Number(item.protein || 0);
      totalFat += Number(item.fat || 0);
      totalCarbs += Number(item.carbs || 0);
    });

    return { totalCalories, totalProtein, totalFat, totalCarbs };
  };

  const customizedNutritionTotals = calculateCustomizedNutrition();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-10 bg-white">
      {/* Outer Container */}
      <div className="w-full h-screen max-w-6xl p-6 overflow-auto bg-white rounded-lg">
        <p className="2xl:text-[27px] text-[24px] text-[#FF4C00] font-bold mb-6">
          Add New Product
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* ============ Above Section ============ */}
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1: Product Details, Main Nutrition Inputs & Additional Nutrition */}
            <div className="space-y-6">
              {/* Upload Image */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-600">
                  Upload Image
                </label>
                <label
                  htmlFor="image"
                  className="flex items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_area
                    }
                    alt="Upload"
                    className="w-[180px] h-[110px]"
                  />
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                    required
                  />
                </label>
              </div>

              {/* Product Name */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-600">
                  Product Name
                </label>
                <input
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  name="name"
                  placeholder="Type here..."
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Product Description */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-600">
                  Product Description
                </label>
                <textarea
                  onChange={onChangeHandler}
                  value={data.description}
                  name="description"
                  rows={4}
                  placeholder="Enter food item description here..."
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>

              {/* Offer Section */}
              <OfferSection
                price={data.price}
                hasOffer={data.hasOffer}
                setHasOffer={(value) =>
                  setData((prevData) => ({ ...prevData, hasOffer: value }))
                }
                onDiscountChange={handleDiscountChange}
              />
            </div>

            {/* Column 2: Product Category and Related Details */}
            <div className="space-y-6">
              {/* Product Category and Price */}
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="mb-2 font-medium text-gray-600">
                    Product Category
                  </label>
                  <select
                    onChange={onChangeHandler}
                    value={data.category}
                    name="category"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Rice">Rice</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Salad">Salad</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Cake">Cake</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mb-2 font-medium text-gray-600">
                    Product Price
                  </label>
                  <input
                    onChange={onChangeHandler}
                    value={data.price}
                    type="number"
                    name="price"
                    placeholder="Rs:500/="
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-600">
                  Delivery Fee
                </label>
                <input
                  onChange={onChangeHandler}
                  value={data.deliveryFee}
                  type="number"
                  name="deliveryFee"
                  placeholder="Enter delivery fee..."
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-600">
                  Delivery Duration (Minutes)
                </label>
                <div className="relative">
                  <input
                    onChange={onChangeHandler}
                    value={data.deliveryDuration}
                    type="number"
                    name="deliveryDuration"
                    min="1"
                    placeholder="30"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <span className="absolute text-gray-600 transform -translate-y-1/2 right-2 top-1/2">
                    mins
                  </span>
                </div>
              </div>

              {/* Main Nutrition Inputs */}
              <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
                <h3 className="mb-2 text-lg font-bold text-gray-700">
                  Main Nutrition Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Calories</label>
                    <input
                      type="number"
                      name="calories"
                      value={mainNutrition.calories}
                      onChange={onMainNutritionChange}
                      placeholder="e.g., 250"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Protein</label>
                    <input
                      type="number"
                      name="protein"
                      value={mainNutrition.protein}
                      onChange={onMainNutritionChange}
                      placeholder="e.g., 10"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Fat</label>
                    <input
                      type="number"
                      name="fat"
                      value={mainNutrition.fat}
                      onChange={onMainNutritionChange}
                      placeholder="e.g., 5"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Carbs</label>
                    <input
                      type="number"
                      name="carbs"
                      value={mainNutrition.carbs}
                      onChange={onMainNutritionChange}
                      placeholder="e.g., 30"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Main Product Nutrition Summary */}
            <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-bold text-gray-700">
                Main Product Nutrition Summary
              </h3>
              <ul className="text-gray-700">
                <li>Calories: {mainNutrition.calories || 0}</li>
                <li>Protein: {mainNutrition.protein || 0}</li>
                <li>Fat: {mainNutrition.fat || 0}</li>
                <li>Carbs: {mainNutrition.carbs || 0}</li>
              </ul>
              {extraNutrition.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Additional Nutrition:</h4>
                  <ul className="text-gray-700">
                    {extraNutrition.map((item, index) => (
                      <li key={index}>
                        {item.key}: {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Additional Nutrition Information */}
          <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
            <h3 className="mb-2 text-lg font-bold text-gray-700">
              Additional Nutrition Information
            </h3>
            {extraNutrition.map((item, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Nutrition Item"
                  value={item.key}
                  onChange={(e) =>
                    handleExtraNutritionChange(index, "key", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) =>
                    handleExtraNutritionChange(index, "value", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => removeExtraNutrition(index)}
                  className="px-2 py-1 text-white bg-red-500 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExtraNutrition}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Add More Nutrition
            </button>
          </div>

          {/* ============ Below Section ============ */}
          <div className="grid grid-cols-3 gap-6">
            {/* Columns 1 & 2: Customized Food Items Section */}
            <div className="col-span-2">
              <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
                <h3 className="mb-2 text-lg font-bold text-gray-700">
                  Customize Your Food
                </h3>
                <CustomizedFoodItems
                  data={data}
                  setData={setData}
                  customizedItems={customizedItems}
                  setCustomizedItems={setCustomizedItems}
                  price={data.price}
                  discountPercentage={data.discountPercentage}
                />
              </div>
            </div>

            {/* Column 3: Customized Items Nutrition Summary */}
            <div className="p-4 bg-gray-100 border rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-bold text-gray-700">
                Customized Items Nutrition Summary
              </h3>
              {customizedItems.length > 0 ? (
                customizedItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 mb-4 border-b border-gray-300"
                  >
                    <h4 className="font-semibold text-md">
                      {item.itemName || "Unnamed Item"}
                    </h4>
                    <ul className="text-gray-700">
                      <li>Calories: {item.itemCalories || 0}</li>
                      <li>Protein: {item.itemProtein || 0}</li>
                      <li>Fat: {item.itemFat || 0}</li>
                      <li>Carbs: {item.itemCarbs || 0}</li>
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No customized items added.</p>
              )}
            </div>
          </div>

          {/* ============ Submit Button ============ */}
          <div>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white transition-all bg-[#FF4C00] rounded-lg hover:bg-orange-500"
            >
              Add Product
            </button>
            <CustomPopup
              message="Food item added successfully!"
              show={showPopup}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
