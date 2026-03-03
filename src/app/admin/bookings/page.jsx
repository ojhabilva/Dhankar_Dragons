"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
    { value: "in_enquiry", label: "In Enquiry", bg: "bg-blue-100", text: "text-blue-700" },
    { value: "processed", label: "Processed", bg: "bg-green-100", text: "text-green-700" },
    { value: "approved", label: "Approved", bg: "bg-green-100", text: "text-green-800" },
    { value: "rejected", label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
    { value: "pending", label: "Pending", bg: "bg-yellow-100", text: "text-yellow-700" },
    { value: "confirmed", label: "Confirmed", bg: "bg-green-100", text: "text-green-700" },
    { value: "cancelled", label: "Cancelled", bg: "bg-red-100", text: "text-red-700" },
];

function getStatusStyle(status) {
    const found = STATUS_OPTIONS.find((s) => s.value === status);
    return found || { bg: "bg-gray-100", text: "text-gray-700", label: status || "Unknown" };
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch("/api/bookings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                toast.success(`Status updated to "${getStatusStyle(status).label}"`);
                fetchBookings();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;
        try {
            const res = await fetch(`/api/bookings?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Booking deleted");
                fetchBookings();
            }
        } catch (error) {
            toast.error("Failed to delete booking");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Bookings</h1>
                    <p className="text-gray-500 italic">View and manage guest reservations.</p>
                </div>
                <div className="bg-[#153e64] text-white px-5 py-2 rounded-xl font-bold">
                    {bookings.length} Total
                </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#153e64] text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Customer</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Room & Stay</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Amount</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Status</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">Loading bookings...</td></tr>
                        ) : bookings.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">No bookings found.</td></tr>
                        ) : (
                            bookings.map((booking) => {
                                const style = getStatusStyle(booking.status);
                                return (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-800">{booking.customer_name}</p>
                                            <p className="text-xs text-gray-600">{booking.customer_email}</p>
                                            <p className="text-xs text-gray-500">{booking.customer_phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-700">{booking.room_name}</p>
                                            <p className="text-xs text-gray-500 italic">{booking.check_in} — {booking.check_out}</p>
                                            <p className="text-xs text-gray-500 uppercase">{booking.guests}</p>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[#8B1C1C]">
                                            ₹{booking.total_price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking.id, e.target.value)}
                                                className={`px-3 py-2 rounded-xl text-xs font-bold border-0 outline-none cursor-pointer ${style.bg} ${style.text}`}
                                            >
                                                {STATUS_OPTIONS.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                                            >
                                                🗑 Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
