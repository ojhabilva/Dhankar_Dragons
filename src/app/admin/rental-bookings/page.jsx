"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
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
                throw new Error();
            }
        } catch (error) {
            toast.error("Failed to update status");
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
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-center">ID</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Customer</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Service</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Date</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Status</th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400 italic">Loading bookings...</td></tr>
                        ) : bookings.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400 italic">No bookings found.</td></tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-center font-mono text-xs text-gray-400">#{b.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-800">{b.customer_name}</p>
                                        <p className="text-xs text-gray-500">{b.customer_phone}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">{b.service_type}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{b.booking_date}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={b.status}
                                            onChange={(e) => updateStatus(b.id, e.target.value)}
                                            className={`text-xs font-bold px-2 py-1 rounded-full outline-none border-none cursor-pointer ${STATUS_COLORS[b.status]}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(b.id)} className="px-3 py-1.5 text-red-600 font-bold hover:bg-red-50 rounded-lg transition">Delete</button>
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
