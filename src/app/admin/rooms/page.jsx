"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        image: "",
        capacity: "2 Adult + 1 Child",
        is_active: 1
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const apiUrl = "/api/rooms";
        console.log(`[RoomsPage] Fetching rooms from: ${window.location.origin}${apiUrl}`);

        try {
            const res = await fetch(apiUrl, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });

            console.log(`[RoomsPage] Response status: ${res.status} ${res.statusText}`);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ msg: "Could not parse error response" }));
                console.error("[RoomsPage] API Error:", errorData);
                throw new Error(errorData.msg || `Server error: ${res.status}`);
            }

            const data = await res.json();
            if (Array.isArray(data)) {
                console.log(`[RoomsPage] Successfully fetched ${data.length} rooms`);
                setRooms(data);
            } else {
                console.error("[RoomsPage] Data is not an array:", data);
                setRooms([]);
            }
        } catch (error) {
            console.error("[RoomsPage] Fetch failure:", error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const body = editingId ? { ...formData, id: editingId } : formData;

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
                setFormData({ name: "", slug: "", image: "", capacity: "2 Adult + 1 Child", is_active: 1 });
                setEditingId(null);
                fetchRooms();
            }
        } catch (error) {
            toast.error("Failed to save");
        }
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-800">Room Management</h1>
                <p className="text-gray-500 italic">Manage your property's room types and availability.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Room" : "Add New Room"}</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Room Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Room Page (Slug)</label>
                            <select
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-white text-gray-800"
                                required
                            >
                                <option value="">-- Select a room page --</option>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                            <input
                                type="text"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64]"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-[#153e64] text-white font-bold py-3 rounded-xl hover:bg-[#0d2a45] transition">
                                {editingId ? "Update" : "Create"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingId(null); setFormData({ name: "", slug: "", image: "", capacity: "2 Adult + 1 Child", is_active: 1 }); }}
                                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 overflow-hidden bg-white rounded-3xl shadow-sm border border-gray-100">
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
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <button
                                                onClick={() => { setEditingId(room.id); setFormData({ name: room.name, slug: room.slug, image: room.image, capacity: room.capacity, is_active: room.is_active }); }}
                                                className="text-[#153e64] font-bold hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(room.id)}
                                                className="text-red-600 font-bold hover:underline"
                                            >
                                                Delete
                                            </button>
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
