"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminPackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [uploadingSlot, setUploadingSlot] = useState(null);
    const [images, setImages] = useState(["", "", "", "", "", ""]);
    const [imagePreviews, setImagePreviews] = useState(["", "", "", "", "", ""]);
    const [terms, setTerms] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        is_active: 1,
        season: "Summer"
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

    const parseJsonField = (field, defaultValue = []) => {
        if (!field) return defaultValue;
        try {
            const parsed = JSON.parse(field);
            return Array.isArray(parsed) ? parsed : [field];
        } catch {
            return field ? [field] : defaultValue;
        }
    };

    const handleFileUpload = async (e, slotIndex) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImagePreviews(prev => {
            const updated = [...prev];
            updated[slotIndex] = previewUrl;
            return updated;
        });
        setUploadingSlot(slotIndex);

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
                setImages(prev => {
                    const updated = [...prev];
                    updated[slotIndex] = result.path;
                    return updated;
                });
                toast.success(`Image ${slotIndex + 1} uploaded!`);
            } else {
                toast.error("Upload failed");
                setImagePreviews(prev => {
                    const updated = [...prev];
                    updated[slotIndex] = "";
                    return updated;
                });
            }
        } catch (error) {
            toast.error("Upload failed");
            setImagePreviews(prev => {
                const updated = [...prev];
                updated[slotIndex] = "";
                return updated;
            });
        } finally {
            setUploadingSlot(null);
        }
    };

    const removeImage = (slotIndex) => {
        setImages(prev => {
            const updated = [...prev];
            updated[slotIndex] = "";
            return updated;
        });
        setImagePreviews(prev => {
            const updated = [...prev];
            updated[slotIndex] = "";
            return updated;
        });
    };

    const handleAddTerm = () => {
        setTerms([...terms, ""]);
    };

    const handleTermChange = (index, value) => {
        const updated = [...terms];
        updated[index] = value;
        setTerms(updated);
    };

    const removeTerm = (index) => {
        setTerms(terms.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validImages = images.filter(img => img.trim() !== "");
        if (validImages.length === 0) {
            toast.error("Please upload at least one image");
            return;
        }

        const validTerms = terms.filter(t => t.trim() !== "");

        const submitData = {
            ...formData,
            image: JSON.stringify(validImages),
            terms_and_conditions: JSON.stringify(validTerms)
        };

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
        setFormData({ name: "", price: "", description: "", is_active: 1, season: "Summer" });
        setEditingId(null);
        setImages(["", "", "", "", "", ""]);
        setImagePreviews(["", "", "", "", "", ""]);
        setTerms([]);
    };

    const handleEdit = (pkg) => {
        setEditingId(pkg.id);
        const existingImages = parseJsonField(pkg.image);
        const paddedImages = [...existingImages, "", "", "", "", "", ""].slice(0, 6);
        setImages(paddedImages);
        setImagePreviews([...paddedImages]);
        setTerms(parseJsonField(pkg.terms_and_conditions));
        setFormData({
            name: pkg.name,
            price: pkg.price,
            description: pkg.description || "",
            is_active: pkg.is_active,
            season: pkg.season || "Summer"
        });
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

    const insertHtmlTag = (tag) => {
        const textarea = document.getElementById("html-editor");
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = formData.description.substring(start, end);
        const text = formData.description;

        let insertion;
        if (tag === "br") {
            insertion = "<br />";
        } else if (tag === "hr") {
            insertion = "<hr />";
        } else if (tag === "ul") {
            insertion = `<ul>\n  <li>${selected || "Item"}</li>\n</ul>`;
        } else if (tag === "ol") {
            insertion = `<ol>\n  <li>${selected || "Item"}</li>\n</ol>`;
        } else {
            insertion = `<${tag}>${selected || ""}</${tag}>`;
        }

        const newText = text.substring(0, start) + insertion + text.substring(end);
        setFormData({ ...formData, description: newText });

        setTimeout(() => {
            textarea.focus();
            const cursorPos = start + insertion.length;
            textarea.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-800">Tour Packages</h1>
                <p className="text-gray-500 italic">Manage your curated Spiti Valley travel experiences.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                <div className="xl:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <h2 className="text-xl font-serif font-bold text-gray-800">{editingId ? "Edit Package" : "Add New Package"}</h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Package Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                placeholder="Enter package name"
                                required
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Season <span className="text-red-500">*</span></label>
                            <select
                                value={formData.season}
                                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C]"
                                required
                            >
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Package Images (up to 6) <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2, 3, 4, 5].map((slotIndex) => (
                                    <div key={slotIndex} className="relative">
                                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#8B1C1C] hover:bg-red-50/30 transition-all group overflow-hidden">
                                            {uploadingSlot === slotIndex ? (
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-5 h-5 border-2 border-[#8B1C1C] border-t-transparent rounded-full animate-spin" />
                                                    <span className="text-[10px] text-gray-500">Uploading...</span>
                                                </div>
                                            ) : imagePreviews[slotIndex] ? (
                                                <div className="relative w-full h-full">
                                                    <img src={imagePreviews[slotIndex]} alt={`Image ${slotIndex + 1}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-semibold">Change</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-[#8B1C1C] transition">
                                                    <span className="text-xl">📷</span>
                                                    <span className="text-[10px] font-medium">Image {slotIndex + 1}</span>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, slotIndex)} />
                                        </label>
                                        {imagePreviews[slotIndex] && (
                                            <button
                                                type="button"
                                                onClick={() => removeImage(slotIndex)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center hover:bg-red-600 transition z-10"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">First image will be the cover. Upload at least 1 image.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">About the Package (HTML Editor) <span className="text-red-500">*</span></label>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="flex flex-wrap gap-1 bg-gray-50 px-3 py-2 border-b border-gray-200">
                                    {[
                                        { tag: "b", label: "B", style: "font-bold" },
                                        { tag: "i", label: "I", style: "italic" },
                                        { tag: "u", label: "U", style: "underline" },
                                        { tag: "h1", label: "H1" },
                                        { tag: "h2", label: "H2" },
                                        { tag: "h3", label: "H3" },
                                        { tag: "h4", label: "H4" },
                                        { tag: "p", label: "P" },
                                        { tag: "strong", label: "Strong" },
                                        { tag: "br", label: "BR" },
                                        { tag: "hr", label: "HR" },
                                        { tag: "ul", label: "UL" },
                                        { tag: "ol", label: "OL" },
                                        { tag: "li", label: "LI" },
                                        { tag: "span", label: "Span" },
                                    ].map((item) => (
                                        <button
                                            key={item.tag}
                                            type="button"
                                            onClick={() => insertHtmlTag(item.tag)}
                                            className={`px-2 py-1 text-xs rounded bg-white border border-gray-200 hover:bg-[#153e64] hover:text-white hover:border-[#153e64] transition ${item.style || ""}`}
                                            title={`Insert <${item.tag}> tag`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    id="html-editor"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 outline-none min-h-[200px] font-mono text-sm resize-y"
                                    placeholder={"Write your package details here using HTML tags...\n\nExample:\n<h3>Day 1: Arrival in Kaza</h3>\n<p>Check-in and rest for high-altitude acclimatization.</p>\n<br />\n<h3>Day 2: Key Monastery</h3>\n<p>Visit the iconic <b>Key Monastery</b> and Kibber Village.</p>"}
                                    required
                                />
                            </div>

                            {formData.description && (
                                <div className="mt-3">
                                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Preview:</p>
                                    <div
                                        className="border border-gray-200 rounded-xl p-4 bg-white text-sm text-gray-800 leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: formData.description }}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700">Terms & Conditions <span className="text-red-500">*</span></label>
                                <button
                                    type="button"
                                    onClick={handleAddTerm}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-[#153e64] hover:text-white transition"
                                    title="Add New Term"
                                >
                                    ＋
                                </button>
                            </div>
                            <div className="space-y-3">
                                {terms.map((term, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={term}
                                            onChange={(e) => handleTermChange(index, e.target.value)}
                                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 outline-none focus:ring-2 focus:ring-[#8B1C1C] text-sm"
                                            placeholder={`Term #${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTerm(index)}
                                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"
                                            title="Remove"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {terms.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">No terms added. Click ＋ to add one.</p>
                                )}
                            </div>
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

                <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                    {loading ? (
                        <div className="col-span-full py-12 text-center text-gray-400">Loading packages...</div>
                    ) : packages.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-400 italic">No tour packages found.</div>
                    ) : (
                        packages.map((pkg) => {
                            const pkgImages = parseJsonField(pkg.image);
                            const coverImage = pkgImages[0] || "";
                            return (
                                <div key={pkg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
                                    <div className="h-48 relative">
                                        {coverImage ? (
                                            <img src={coverImage} alt={pkg.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#8B1C1C]">
                                            ₹{pkg.price}
                                        </div>
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold ${pkg.season === 'Winter' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {pkg.season || 'Summer'}
                                        </div>
                                        {pkgImages.length > 1 && (
                                            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
                                                📷 {pkgImages.length} images
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-serif font-bold text-gray-800">{pkg.name}</h3>
                                            {!pkg.is_active && (
                                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase">Inactive</span>
                                            )}
                                        </div>


                                        {pkg.description && (
                                            <div
                                                className="text-sm text-gray-600 mt-4 line-clamp-3 italic"
                                                dangerouslySetInnerHTML={{ __html: pkg.description }}
                                            />
                                        )}

                                        <div className="mt-6 flex justify-between">
                                            <button
                                                onClick={() => handleEdit(pkg)}
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
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
