import React, { useState, useEffect } from "react";
import { useCart } from "../Components/CartContext";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [selected, setSelected] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [bookings, setBookings] = useState([]);

  const total = cart.reduce((sum, item) => sum + (item.finalPrice || item.price || 0), 0);
  const allSelected = cart.length > 0 && selected.length === cart.length;

  const toggleSelectAll = () => setSelected(allSelected ? [] : cart.map((item) => item.id));

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const removeSelected = () => {
    selected.forEach((id) => removeFromCart(id));
    setSelected([]);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    if (!date || !time || !address) {
      alert("Please fill in address, date, and time.");
      return;
    }

    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay");
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/create-payment`,
        { amount: total },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_1234567890abcdef",
        amount: order.amount,
        currency: "INR",
        name: "WeCare",
        description: "Service Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/confirm`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                services: cart.map((item) => ({ service: item._id || item.id, quantity: 1 })),
                totalAmount: total,
                discount: 0,
                finalAmount: total,
                address,
                date,
                timeSlot: time,
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setPaymentSuccess(true);
            alert("Booking Successful!");
            removeSelected();
            fetchBookings();
          } catch (err) {
            console.error("Booking failed", err);
            alert("Booking failed");
          }
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#9333ea" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Payment failed. Have you logged in?");
    }

    setLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/my-bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-200 p-4">
      {/* This is the line that was changed */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 lg:items-start">
        <section className="lg:col-span-2 bg-white p-12 rounded-3xl shadow-xl border border-purple-200 ">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold text-purple-700">Your Cart</h1>
            {cart.length > 0 && (
              <button
                className="text-sm text-purple-600 underline hover:text-purple-800"
                onClick={toggleSelectAll}
              >
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            )}
          </div>

          {selected.length > 0 && (
            <button
              onClick={removeSelected}
              className="mb-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full font-semibold shadow"
            >
              Remove Selected
            </button>
          )}

          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10">Cart is empty</div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-purple-100 shadow-md bg-purple-50 hover:shadow-lg"
                >
                  <input
                    type="checkbox"
                    className="accent-purple-600 w-5 h-5 self-start"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />

                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                  )}

                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-purple-700">{item.name}</h2>
                    <p className="text-sm text-gray-700">
                      Price: ₹{item.originalPrice} <br />
                      Discount: {item.discount || 0}% <br />
                      Final: ₹{item.finalPrice || item.price}
                    </p>
                  </div>

                  {selected.includes(item.id) && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Selected
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="bg-white p-6 rounded-3xl shadow-xl border border-purple-200 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Booking Info</h3>
            <label className="text-sm font-semibold text-gray-700">Address</label>
            <input
              type="text"
              className="w-full mb-3 p-2 border rounded-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              className="w-full mb-3 p-2 border rounded-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label className="text-sm font-semibold text-gray-700">Time</label>
            <input
              type="time"
              className="w-full mb-6 p-2 border rounded-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <div className="text-lg font-bold mb-4 text-purple-700">
              Total: ₹<span className="text-2xl">{total}</span>
            </div>
            <button
              onClick={handlePayNow}
              disabled={loading || paymentSuccess}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg shadow"
            >
              {loading ? "Processing..." : paymentSuccess ? "Success" : "Pay Now"}
            </button>
            {paymentSuccess && (
              <div className="mt-3 text-green-600 text-center font-semibold">
                Payment successful!
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;