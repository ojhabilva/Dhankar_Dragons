"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const RENTAL_TYPES = ["bike", "horse", "car"];

export default function AdminRentalsPage() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        type: "bike",
        about: "",
        image: "",
        is_active: 1
    });

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const res = await fetch("/api/rentals", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setRentals(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to load rentals");
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
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...formData, id: editingId } : formData;

        try {
            const res = await fetch("/api/rentals", {
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
                fetchRentals();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
    };

    const resetForm = () => {
        setFormData({ type: "bike", about: "", image: "", is_active: 1 });
        setEditingId(null);
        setImagePreview("");
    };

    const startEditing = (rental) => {
        setEditingId(rental.id);
        setFormData({
            type: rental.type,
            about: rental.about,
            image: rental.image,
            is_active: rental.is_active,
        });
        setImagePreview(rental.image || "");
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/rentals?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Deleted");
                fetchRentals();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Rental Services</h1>
                <p className="text-gray-500 italic">Manage rental biological and mechanical vehicles.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Service" : "Add New Rental"}</h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type <span className="text-red-500">*</span></label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-gray-100 text-gray-800 capitalize"
                                required
                            >
                                {RENTAL_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">About Service <span className="text-red-500">*</span></label>
                            <textarea
                                value={formData.about}
                                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#153e64] h-32 resize-none"
                                placeholder="Describe the service..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image <span className="text-red-500">*</span></label>
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#153e64] hover:bg-blue-50/30 transition-all group overflow-hidden">
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-[#153e64] border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs text-gray-500">Uploading...</span>
                                    </div>
                                ) : imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#153e64] transition-colors">
                                        <span className="text-3xl">📷</span>
                                        <span className="text-xs font-medium">Upload service image</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-[#153e64] text-white font-bold py-3 rounded-xl hover:bg-[#0d2a45] transition">
                                {editingId ? "Update" : "Create"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Service</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Description</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 italic">Loading services...</td></tr>
                            ) : rentals.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 italic">No services found.</td></tr>
                            ) : (
                                rentals.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={s.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                <span className="font-bold text-gray-800 capitalize">{s.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{s.about}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => startEditing(s)} className="px-3 py-1.5 text-[#153e64] font-bold hover:bg-blue-50 rounded-lg transition">Edit</button>
                                                <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 text-red-600 font-bold hover:bg-red-50 rounded-lg transition">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
