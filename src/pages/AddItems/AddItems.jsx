import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import CustomizedFoodItems from "./CustomizedFoodItems";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomPopup from "../../components/Common/CustomPopup";

const AddItems = () => {
  const url = "http://localhost:3001";
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza",
    deliveryFee: "",
    deliveryDuration: "20",
    customizedItems: [],
  });

  // State for customized items array
  const [customizedItems, setCustomizedItems] = useState([]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    console.log("Customized Items: ", customizedItems);
  }, [customizedItems]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("deliveryFee", Number(data.deliveryFee));
    formData.append("deliveryDuration", Number(data.deliveryDuration));
    formData.append("image", image);
    // Append customized items array to formData
    formData.append("customizedItems", JSON.stringify(customizedItems));

    // Submit to API
    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Required for FormData
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Pizza",
          deliveryFee: "",
          deliveryDuration: "20",
          customizedItems: [],
        });
        setImage(false);
        setCustomizedItems([]);

        toast.success(response.data.message);

        setShowPopup(true);
        
        // Reload route
        setTimeout(() => {
          navigate(0);
        }, 1000); // 5000ms = 5 seconds
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      {/* Outer Container */}
      <div className="w-full h-screen max-w-6xl px-8 py-6 overflow-auto bg-white rounded-lg shadow-lg">
        {/* Form Header */}
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-700">
          Add New Product
        </h2>

        {/* Form Section */}

        <form onSubmit={onSubmitHandler} className="grid grid-cols-2 gap-6">
          {/* Left Section */}
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
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
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
          </div>

          {/* Right Section */}
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

            {/* Delivery Fee */}
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

            {/* Delivery Duration */}
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

            {/* Customized Food Items */}
            <CustomizedFoodItems
              data={data}
              setData={setData}
              customizedItems={customizedItems}
              setCustomizedItems={setCustomizedItems}
              // apiUrl={url}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 font-medium text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Product
            </button>
            {/* Custom Popup */}
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
