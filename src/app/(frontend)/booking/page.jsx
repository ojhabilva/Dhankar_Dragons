"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    room_name: searchParams.get("room") || "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    check_in: searchParams.get("checkin") || "",
    check_out: searchParams.get("checkout") || "",
    guests: `${searchParams.get("adults") || 2} Adults, ${searchParams.get("children") || 0} Children`,
    total_price: 0,
    special_requests: "",
  });

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRooms(data); })
      .catch(() => { });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.room_name || !form.customer_name || !form.customer_email || !form.customer_phone || !form.check_in || !form.check_out) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("🎉 Booking submitted! We'll confirm shortly.");
        setTimeout(() => router.push("/"), 2000);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen pb-16">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-[#153e64] text-white py-12 text-center">
        <h1 className="text-4xl font-serif font-bold">Book Your Stay</h1>
        <p className="text-white/70 mt-2 italic">Dhankhar Dragons — Spiti Valley</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">

          {/* Room Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Room *</label>
            <select
              name="room_name"
              value={form.room_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-white text-gray-800"
              required
            >
              <option value="">-- Choose a room --</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.name}>{room.name}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-In Date *</label>
              <input
                type="date"
                name="check_in"
                value={form.check_in}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Check-Out Date *</label>
              <input
                type="date"
                name="check_out"
                value={form.check_out}
                onChange={handleChange}
                min={form.check_in || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                required
              />
            </div>
          </div>

          {/* Guest Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
            <input
              type="text"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              placeholder="e.g. 2 Adults, 1 Child"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
            />
          </div>

          {/* Divider */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-serif font-bold text-gray-700 mb-4">Your Details</h2>
          </div>

          {/* Name + Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="customer_email"
                value={form.customer_email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="customer_phone"
                value={form.customer_phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Budget (₹)</label>
              <input
                type="number"
                name="total_price"
                value={form.total_price}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
            <textarea
              name="special_requests"
              value={form.special_requests}
              onChange={handleChange}
              placeholder="Any dietary needs, accessibility requirements, etc."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
            />
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
            <strong>Note:</strong> This is a booking inquiry. Our team will contact you within 24 hours to confirm availability and finalize your stay.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B1C1C] hover:bg-[#6f1515] text-white font-bold py-4 rounded-xl text-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Confirm Booking Request"}
          </button>
        </form>

        {/* Important Info */}
        <div className="mt-8 bg-white rounded-3xl shadow p-6 text-sm text-gray-600 space-y-2">
          <h3 className="font-semibold text-gray-800 mb-3">Important Information</h3>
          <p>✅ Unmarried couples are not allowed</p>
          <p>✅ Primary guest must be at least 18 years of age</p>
          <p>✅ Aadhaar and Govt. ID accepted as proof</p>
          <p>✅ Cancellation policies vary by room type</p>
          <p>✅ Pets are not allowed on the property</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
