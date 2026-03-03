"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    confirmed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
};

export default function AdminRentalBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/rental-bookings", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to load rental bookings");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch("/api/rental-bookings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({ id, status }),
            });

            if (res.ok) {
                toast.success("Status updated!");
                fetchBookings();
            } else {
                const data = await res.json();
                throw new Error(data.error || "Failed");
            }
        } catch (error) {
            toast.error(`Update failed: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/rental-bookings?id=${id}`, {
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
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Rental Bookings</h1>
                <p className="text-gray-500 italic">Review and manage vehicle and animal rental requests.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full text-left font-sans">
                    <thead className="bg-[#153e64] text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-center w-20">ID</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Customer</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Service</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Date</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase">Status</th>
                            <th className="px-6 py-4 text-sm font-bold uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">Loading bookings...</td></tr>
                        ) : bookings.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">No bookings found.</td></tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-center font-mono text-xs text-gray-400 italic">#{b.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-800">{b.customer_name}</p>
                                        <p className="text-xs text-blue-600 font-medium">{b.customer_email}</p>
                                        <p className="text-xs text-gray-500">{b.customer_phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold border border-orange-100 shadow-sm">{b.service_type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{b.booking_date}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={b.status}
                                            onChange={(e) => updateStatus(b.id, e.target.value)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-xl outline-none border cursor-pointer border-transparent ring-1 ring-black/5 ${STATUS_COLORS[b.status] || "bg-gray-100 text-gray-800"}`}
                                        >
                                            <option value="pending">⏳ Pending</option>
                                            <option value="approved">✅ Approved</option>
                                            <option value="confirmed">💳 Confirmed</option>
                                            <option value="rejected">❌ Rejected</option>
                                            <option value="cancelled">🚫 Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(b.id)} className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition text-sm">🗑 Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
