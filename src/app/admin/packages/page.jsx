"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminPackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        price: "",
        image: "",
        is_active: 1
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await fetch("/api/packages", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            const data = await res.json();
            setPackages(data);
        } catch (error) {
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...formData, id: editingId } : formData;

        try {
            const res = await fetch("/api/packages", {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success(editingId ? "Updated!" : "Created!");
                setFormData({ name: "", duration: "", price: "", image: "", is_active: 1 });
                setEditingId(null);
                fetchPackages();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/packages?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Deleted");
                fetchPackages();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-800">Tour Packages</h1>
                <p className="text-gray-500 italic">Manage your curated Spiti Valley travel experiences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Package" : "Add New Package"}</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Package Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (e.g., 5 Days / 4 Nights)</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-[#8B1C1C] text-white font-bold py-3 rounded-xl hover:bg-[#6f1515] transition">
                                {editingId ? "Update" : "Create"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingId(null); setFormData({ name: "", duration: "", price: "", image: "", is_active: 1 }); }}
                                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-full py-12 text-center text-gray-400">Loading packages...</div>
                    ) : packages.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-400 italic">No tour packages found.</div>
                    ) : (
                        packages.map((pkg) => (
                            <div key={pkg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                <div className="h-48 relative">
                                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#8B1C1C]">
                                        ₹{pkg.price}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-lg font-serif font-bold text-gray-800">{pkg.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{pkg.duration}</p>

                                    <div className="mt-auto pt-6 flex justify-between">
                                        <button
                                            onClick={() => { setEditingId(pkg.id); setFormData({ name: pkg.name, duration: pkg.duration, price: pkg.price, image: pkg.image, is_active: pkg.is_active }); }}
                                            className="text-sm font-bold text-[#153e64] hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
                                            className="text-sm font-bold text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
