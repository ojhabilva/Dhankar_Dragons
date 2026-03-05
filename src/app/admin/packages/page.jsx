"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminPackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        days: 1,
        nights: 0,
        price: "",
        image: "",
        description: "",
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
            setPackages(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        setUploading(true);

        try {
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("folder", "packages");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, image: result.path }));
                toast.success("Image uploaded!");
            } else {
                toast.error("Upload failed");
                setImagePreview("");
            }
        } catch (error) {
            toast.error("Upload failed");
            setImagePreview("");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const duration = `${formData.days} Days / ${formData.nights} Nights`;
        const submitData = { ...formData, duration };

        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...submitData, id: editingId } : submitData;

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
                resetForm();
                fetchPackages();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
    };

    const resetForm = () => {
        setFormData({ name: "", days: 1, nights: 0, price: "", image: "", description: "", is_active: 1 });
        setEditingId(null);
        setImagePreview("");
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
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                placeholder="Enter package name"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Days</label>
                                <select
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                >
                                    {[...Array(21)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1} Day{i + 1 > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nights</label>
                                <select
                                    value={formData.nights}
                                    onChange={(e) => setFormData({ ...formData, nights: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                >
                                    {[...Array(21)].map((_, i) => (
                                        <option key={i} value={i}>{i} Night{i !== 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                placeholder="Enter price in ₹"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Package Image</label>
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#8B1C1C] hover:bg-red-50/30 transition-all group">
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-[#8B1C1C] border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs text-gray-500">Uploading...</span>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="relative w-full h-full p-2">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#8B1C1C] transition-colors">
                                        <span className="text-3xl">🖼️</span>
                                        <span className="text-xs font-medium">Click to upload image</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">About the Package</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C] min-h-[120px]"
                                placeholder="Describe the package itinerary, inclusions, etc..."
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
                                    onClick={resetForm}
                                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                    {loading ? (
                        <div className="col-span-full py-12 text-center text-gray-400">Loading packages...</div>
                    ) : packages.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-400 italic">No tour packages found.</div>
                    ) : (
                        packages.map((pkg) => (
                            <div key={pkg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
                                <div className="h-48 relative">
                                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#8B1C1C]">
                                        ₹{pkg.price}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-serif font-bold text-gray-800">{pkg.name}</h3>
                                        {!pkg.is_active && (
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase">Inactive</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{pkg.duration}</p>

                                    {pkg.description && (
                                        <p className="text-sm text-gray-600 mt-4 line-clamp-3 italic">
                                            {pkg.description}
                                        </p>
                                    )}

                                    <div className="mt-6 flex justify-between">
                                        <button
                                            onClick={() => {
                                                setEditingId(pkg.id);
                                                setFormData({
                                                    name: pkg.name,
                                                    days: pkg.days || 1,
                                                    nights: pkg.nights || 0,
                                                    price: pkg.price,
                                                    image: pkg.image,
                                                    description: pkg.description || "",
                                                    is_active: pkg.is_active
                                                });
                                                setImagePreview(pkg.image);
                                            }}
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
