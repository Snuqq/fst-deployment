import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaSpinner } from "react-icons/fa";
import { BASE_URL } from "../api/AuthApi";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BASE_URL}cart/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setCartItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };
    fetchCart();
  }, [navigate]);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + item.qty * parseFloat(item.product.product_price || 0),
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleRemove = async (cart_id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${BASE_URL}${cart_id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.cart_id !== cart_id));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleQtyChange = async (cart_id, newQty) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.put(
        `${BASE_URL}${cart_id}/`,
        { qty: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) => (item.cart_id === cart_id ? res.data : item))
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-br from-indigo-50 to-white min-h-[60vh]">
        <FaSpinner className="animate-spin text-indigo-600 text-5xl mb-6" />
        <p className="text-gray-700 text-xl font-medium">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-white py-20 px-4 sm:px-6 lg:px-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center bg-white rounded-xl shadow-lg p-10">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-indigo-300" />
          <p className="mt-6 text-gray-600 text-lg font-medium">
            Your cart is empty.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white py-16 px-4 sm:px-6 lg:px-20 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg shadow">
            Shopping Cart
          </span>
        </h2>

        <ul className="space-y-6 mb-10">
          {cartItems.map((item) => (
            <li
              key={item.cart_id}
              className="flex items-center bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <img
                src={
                  item.product.image
                    ? `${BASE_URL}${item.product.image}`
                    : "https://via.placeholder.com/100x100.png?text=No+Image"
                }
                alt={item.product.product_name}
                className="h-24 w-24 rounded-lg object-cover border border-gray-200"
              />
              <div className="flex-1 ml-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.product.product_name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-gray-500 font-medium">
                    Qty:
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-indigo-100 hover:text-indigo-700 transition disabled:opacity-50"
                      disabled={item.qty <= 1}
                      onClick={() =>
                        handleQtyChange(item.cart_id, item.qty - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={item.product.countInStock}
                      value={item.qty}
                      onChange={(e) => {
                        let val = parseInt(e.target.value) || 1;
                        if (val < 1) val = 1;
                        if (val > item.product.countInStock) val = item.product.countInStock;
                        handleQtyChange(item.cart_id, val);
                      }}
                      className="input-no-arrows w-14 px-3 py-1 rounded border border-gray-300 bg-gray-100 text-gray-900 font-semibold text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      style={{
                        appearance: "none",
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                      }}
                    />
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-indigo-100 hover:text-indigo-700 transition disabled:opacity-50"
                      disabled={item.qty >= item.product.countInStock}
                      onClick={() =>
                        handleQtyChange(item.cart_id, item.qty + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-base text-indigo-700 mt-3 font-bold">
                  ₱
                  {(
                    item.qty * parseFloat(item.product.product_price || 0)
                  ).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.cart_id)}
                className="ml-6 text-gray-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50"
                title="Remove item"
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
            </li>
          ))}
        </ul>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h3>
          <div className="space-y-3 text-gray-700 text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₱{subtotal.toFixed(2)}</span>
            </div>
            <hr className="my-3 border-gray-200" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-indigo-700">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition text-lg font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

