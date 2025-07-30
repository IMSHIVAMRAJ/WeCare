// BookingPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/booking/my-bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6 border border-purple-200 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-purple-600">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gradient-to-r from-white via-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-4 mb-4 shadow flex flex-col gap-2"
          >
            <div><strong>Order ID:</strong> {booking.razorpay?.orderId || "N/A"}</div>
            <div><strong>Payment ID:</strong> {booking.razorpay?.paymentId || "N/A"}</div>
            <div>
              <strong>Status:</strong>{" "}
              <span className={`font-semibold px-3 py-1 rounded-full shadow text-white bg-gradient-to-r ${
                booking.status === "pending"
                  ? "from-yellow-400 to-yellow-600"
                  : booking.status === "accepted"
                  ? "from-blue-400 to-blue-600"
                  : booking.status === "completed"
                  ? "from-purple-400 to-purple-600"
                  : "from-purple-400 to-purple-600"
              }`}>
                {booking.status}
              </span>
            </div>
            <div><strong>Total:</strong> ₹{booking.totalAmount}</div>
            <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
            <div><strong>Time Slot:</strong> {booking.timeSlot}</div>
            <div><strong>Address:</strong> {booking.address}</div>
            <div>
              <strong>Services:</strong>
              <ul className="list-disc list-inside">
                {booking.services.map((item, idx) => (
                  <li key={idx}>
                    {item.service?.name || "Service"} (Qty: {item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingPage;
