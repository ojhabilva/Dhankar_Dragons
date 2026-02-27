"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        text: "",
        rating: 5,
        image: "https://avatar.iran.liara.run/public/1"
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/testimonials", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            const data = await res.json();
            if (data.success) setTestimonials(data.data);
        } catch (error) {
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...formData, id: editingId } : formData;

        try {
            const res = await fetch("/api/testimonials", {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success(editingId ? "Updated!" : "Created!");
                setFormData({ name: "", text: "", rating: 5, image: "https://avatar.iran.liara.run/public/1" });
                setEditingId(null);
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/testimonials?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Deleted");
                fetchTestimonials();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Testimonials</h1>
                    <p className="text-gray-500 italic">Manage what your guests say about you.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Guest Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Review Text</label>
                            <textarea
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                                {editingId ? "Update" : "Create"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingId(null); setFormData({ name: "", text: "", rating: 5, image: "https://avatar.iran.liara.run/public/1" }); }}
                                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>


                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-gray-400">Loading...</div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">No testimonials found.</div>
                    ) : (
                        testimonials.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        <div className="text-yellow-500 text-sm">
                                            {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                        </div>
                                        <p className="text-gray-600 text-sm mt-2 line-clamp-3 italic">"{item.text}"</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => { setEditingId(item.id); setFormData({ name: item.name, text: item.text, rating: item.rating, image: item.image }); }}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
