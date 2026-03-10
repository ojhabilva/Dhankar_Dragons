"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CATEGORIES = [
    { key: "rooms", label: "Rooms" },
    { key: "dining", label: "Dining Area" },
    { key: "scenic", label: "Scenic View" },
    { key: "reception", label: "Reception" },
];

export default function AdminGalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("rooms");
    const [imagePreview, setImagePreview] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/gallery", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setImages(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to load gallery images");
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            toast.error("Please select an image");
            return;
        }

        setUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append("file", imageFile);
            uploadData.append("folder", "gallery");

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const uploadResult = await uploadRes.json();

            if (!uploadResult.success) {
                toast.error("Image upload failed");
                return;
            }

            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({
                    category: selectedCategory,
                    image: uploadResult.path,
                }),
            });

            if (res.ok) {
                toast.success("Image added to gallery!");
                resetForm();
                fetchImages();
            } else {
                toast.error("Failed to save image");
            }
        } catch (error) {
            toast.error("Failed to add image");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this image from the gallery?")) return;
        try {
            const res = await fetch(`/api/gallery?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Image deleted");
                fetchImages();
            }
        } catch (error) {
            toast.error("Failed to delete image");
        }
    };

    const resetForm = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = images.filter((img) => img.category === cat.key);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Gallery Management</h1>
                <p className="text-gray-500 italic">Upload and manage images for the homepage gallery.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">Add Gallery Image</h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#153e64] bg-gray-100 text-gray-800"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image <span className="text-red-500">*</span></label>
                            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#153e64] hover:bg-blue-50/30 transition-all group">
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-[#153e64] border-t-transparent rounded-full animate-spin" />
                                        <span className="text-xs text-gray-500">Uploading...</span>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="relative w-full h-full p-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#153e64] transition-colors">
                                        <span className="text-3xl">🖼️</span>
                                        <span className="text-xs font-medium">Click to upload</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full bg-[#153e64] text-white font-bold py-3 rounded-xl hover:bg-[#0d2a45] transition disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Add Image"}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 italic">
                            Loading gallery images...
                        </div>
                    ) : (
                        CATEGORIES.map((cat) => (
                            <div key={cat.key} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-serif font-bold text-gray-800">{cat.label}</h3>
                                    <span className="text-sm text-gray-400 font-semibold">{grouped[cat.key].length} images</span>
                                </div>

                                {grouped[cat.key].length === 0 ? (
                                    <p className="text-gray-400 text-sm italic py-4 text-center">No images in this category yet.</p>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {grouped[cat.key].map((img) => (
                                            <div key={img.id} className="relative group rounded-xl overflow-hidden h-28">
                                                <img
                                                    src={img.image}
                                                    alt={cat.label}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        onClick={() => handleDelete(img.id)}
                                                        className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
