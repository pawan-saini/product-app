// src/components/CODCheckoutPage.js

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearState } from "../../redux/cartSlice";

export default function Checkout() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Implement the logic for placing the order

    dispatch(clearState());

    navigate("/thankyou");
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4 border p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between">
            <span>Order Amount:</span>
            <span>$100</span>
          </div>
          {/* You can add more summary items (e.g., taxes, discounts) here */}
        </div>

        <div className="mt-8">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
