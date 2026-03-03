"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState({ image: false, wash_image: false });
    const [imagePreviews, setImagePreviews] = useState({ image: "", wash_image: "" });
    const [formData, setFormData] = useState({
        slug: "",
        name: "",
        image: "",
        wash_image: "",
        adults: "2",
        children: "1",
        is_active: 1
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const apiUrl = "/api/rooms";
        try {
            const res = await fetch(apiUrl, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ msg: "Could not parse error response" }));
                throw new Error(errorData.msg || `Server error: ${res.status}`);
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setRooms(data);
            } else {
                setRooms([]);
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                toast.error("Network error: Check if the server is running and accessible");
            } else {
                toast.error(error.message || "Failed to fetch rooms");
            }
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImagePreviews(prev => ({ ...prev, [field]: previewUrl }));
        setUploading(prev => ({ ...prev, [field]: true }));

        try {
            const uploadData = new FormData();
            uploadData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, [field]: result.path }));
                toast.success(`${field === "image" ? "Room" : "Washroom"} image uploaded!`);
            } else {
                toast.error("Upload failed");
                setImagePreviews(prev => ({ ...prev, [field]: "" }));
            }
        } catch (error) {
            toast.error("Upload failed");
            setImagePreviews(prev => ({ ...prev, [field]: "" }));
        } finally {
            setUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const capacity = `${formData.adults} Adult + ${formData.children} Child`;
        const submitData = {
            name: formData.name,
            slug: formData.slug,
            image: formData.image,
            wash_image: formData.wash_image,
            capacity,
            is_active: formData.is_active,
        };

        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...submitData, id: editingId } : submitData;

        try {
            const res = await fetch("/api/rooms", {
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
                fetchRooms();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
    };

    const resetForm = () => {
        setFormData({ slug: "", name: "", image: "", wash_image: "", adults: "2", children: "1", is_active: 1 });
        setEditingId(null);
        setImagePreviews({ image: "", wash_image: "" });
    };

    const startEditing = (room) => {
        const capacityMatch = room.capacity?.match(/(\d+)\s*Adult\s*\+\s*(\d+)\s*Child/i);
        const adults = capacityMatch ? capacityMatch[1] : "2";
        const children = capacityMatch ? capacityMatch[2] : "1";

        setEditingId(room.id);
        setFormData({
            slug: room.slug,
            name: room.name,
            image: room.image,
            wash_image: room.wash_image || "",
            adults,
            children,
            is_active: room.is_active,
        });
        setImagePreviews({
            image: room.image || "",
            wash_image: room.wash_image || "",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/rooms?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Deleted");
                fetchRooms();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const UploadBox = ({ label, field, icon }) => (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#153e64] hover:bg-blue-50/30 transition-all group">
                {uploading[field] ? (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-[#153e64] border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-gray-500">Uploading...</span>
                    </div>
                ) : imagePreviews[field] ? (
                    <div className="relative w-full h-full p-2">
                        <img
                            src={imagePreviews[field]}
                            alt={label}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">Change Image</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#153e64] transition-colors">
                        <span className="text-3xl">{icon}</span>
                        <span className="text-xs font-medium">Click to upload</span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, field)}
                />
            </label>
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Room Management</h1>
                <p className="text-gray-500 italic">Manage your property's room types and availability.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Room" : "Add New Room"}</h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type (Slug)</label>
                            <select
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-gray-100 text-gray-800"
                                required
                            >
                                <option value="">-- Select room type --</option>
                                <option value="standard-room">Standard Room → /rooms/standard-room</option>
                                <option value="deluxe-room">Deluxe Room → /rooms/deluxe-room</option>
                                <option value="super-deluxe-room">Super Deluxe Room → /rooms/super-deluxe-room</option>
                            </select>
                            {formData.slug && (
                                <p className="text-xs text-gray-400 mt-1">
                                    🔗 Links to: <span className="text-[#153e64] font-mono">/rooms/{formData.slug}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Room Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#153e64]"
                                placeholder="Enter room name"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <UploadBox label="Inside Room" field="image" icon="🛏️" />
                            <UploadBox label="Washroom" field="wash_image" icon="🚿" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Room Capacity</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Adults</p>
                                    <select
                                        value={formData.adults}
                                        onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-gray-100 text-gray-800"
                                    >
                                        {[...Array(9)].map((_, i) => (
                                            <option key={`adult-${i + 1}`} value={String(i + 1)}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Children</p>
                                    <select
                                        value={formData.children}
                                        onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-gray-100 text-gray-800"
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={`child-${i}`} value={String(i)}>{i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-3">
                                Capacity: <span className="font-semibold text-[#153e64]">{formData.adults} Adult + {formData.children} Child</span>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-[#153e64] text-white font-bold py-3 rounded-xl hover:bg-[#0d2a45] transition">
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

                <div className="lg:col-span-2 overflow-x-auto bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Room</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Capacity</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 italic">Loading rooms...</td></tr>
                            ) : !Array.isArray(rooms) || rooms.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400 italic">No rooms found.</td></tr>
                            ) : (
                                rooms.map((room) => (
                                    <tr key={room.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={room.image} alt={room.name} className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <p className="font-bold text-gray-800">{room.name}</p>
                                                    <p className="text-xs text-gray-500 italic">/{room.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{room.capacity}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => startEditing(room)}
                                                    className="relative z-10 px-3 py-1.5 text-[#153e64] font-bold hover:bg-blue-50 rounded-lg cursor-pointer transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(room.id)}
                                                    className="relative z-10 px-3 py-1.5 text-red-600 font-bold hover:bg-red-50 rounded-lg cursor-pointer transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
