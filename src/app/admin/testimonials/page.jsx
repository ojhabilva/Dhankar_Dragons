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

    const handleDecline = async (id) => {
        if (!confirm("Are you sure you want to decline and delete this testimonial?")) return;
        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Testimonial declined and deleted");
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to decline");
        }
    };

    const pendingCount = testimonials.filter(t => t.status === "pending").length;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Testimonials</h1>
                    <p className="text-gray-500 italic">Review and approve guest testimonials.</p>
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
                        <div key={item.id} className={`bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-start ${item.status === "pending" ? "border-yellow-300 bg-yellow-50/30" : "border-gray-100"}`}>
                            <div className="flex gap-4 flex-1">
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                            }`}>
                                            {item.status === "pending" ? "⏳ Pending" : "✅ Approved"}
                                        </span>
                                    </div>
                                    <div className="text-yellow-500 text-sm">
                                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2 italic">"{item.text}"</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                                {item.status === "pending" && (
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        className="px-4 py-2 text-sm font-bold text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                    >
                                        ✓ Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDecline(item.id)}
                                    className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                >
                                    ✕ {item.status === "pending" ? "Decline" : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
