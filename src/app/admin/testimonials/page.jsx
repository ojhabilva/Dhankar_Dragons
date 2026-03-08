"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials?all=true", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) {
                toast.error("Failed to fetch testimonials: " + (res.status === 401 ? "Unauthorized" : "Server error"));
                return;
            }
            const data = await res.json();
            if (data.success) {
                const sorted = data.data.sort((a, b) => {
                    if (a.status === "pending" && b.status !== "pending") return -1;
                    if (a.status !== "pending" && b.status === "pending") return 1;
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setTestimonials(sorted);
            }
        } catch (error) {
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await fetch("/api/testimonials", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({ id, status: "approved" }),
            });

            if (res.ok) {
                toast.success("Testimonial approved!");
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to approve");
        }
    };

    const handleToggleVisibility = async (id, currentIsActive) => {
        const newIsActive = currentIsActive ? 0 : 1;
        try {
            const res = await fetch("/api/testimonials", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({ id, is_active: newIsActive }),
            });

            if (res.ok) {
                toast.success(newIsActive ? "Testimonial is now visible on frontend" : "Testimonial hidden from frontend");
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to update visibility");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to permanently delete this testimonial?")) return;
        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Testimonial deleted");
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const pendingCount = testimonials.filter(t => t.status === "pending").length;

    const getStatusBadge = (item) => {
        if (item.status === "pending") {
            return <span className="text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">⏳ Pending</span>;
        }
        if (item.status === "approved" && item.is_active) {
            return <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">✅ Visible</span>;
        }
        if (item.status === "approved" && !item.is_active) {
            return <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-200 text-gray-600">👁️‍🗨️ Hidden</span>;
        }
        return null;
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Testimonials</h1>
                    <p className="text-gray-500 italic">Review, approve, and manage guest testimonials.</p>
                </div>
                {pendingCount > 0 && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                        {pendingCount} Pending Review
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading...</div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No testimonials found.</div>
                ) : (
                    testimonials.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col sm:flex-row justify-between items-start gap-4
                                ${item.status === "pending" ? "border-yellow-300 bg-yellow-50/30" : ""}
                                ${item.status === "approved" && !item.is_active ? "opacity-60" : ""}
                            `}
                        >
                            <div className="flex gap-4 flex-1">
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        {getStatusBadge(item)}
                                    </div>
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2 italic">"{item.text}"</p>
                                </div>
                            </div>
                            <div className="flex flex-row sm:flex-col gap-2 ml-0 sm:ml-4 flex-shrink-0">
                                {item.status === "pending" && (
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        className="px-4 py-2 text-sm font-bold text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                    >
                                        ✓ Approve
                                    </button>
                                )}
                                {item.status === "approved" && (
                                    <button
                                        onClick={() => handleToggleVisibility(item.id, item.is_active)}
                                        className={`px-4 py-2 text-sm font-bold rounded-lg transition ${item.is_active
                                                ? "text-amber-700 bg-amber-100 hover:bg-amber-200"
                                                : "text-blue-700 bg-blue-100 hover:bg-blue-200"
                                            }`}
                                    >
                                        {item.is_active ? "👁️ Hide" : "👁️ Show"}
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                >
                                    ✕ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
