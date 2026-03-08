"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/contacts", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setContacts(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error("Failed to load contact submissions");
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this contact submission?")) return;
        try {
            const res = await fetch(`/api/contacts?id=${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` }
            });
            if (res.ok) {
                toast.success("Deleted");
                fetchContacts();
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Contact Submissions</h1>
                <p className="text-gray-500 italic">View and manage messages from visitors.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="px-6 py-12 text-center text-gray-400 italic">Loading submissions...</div>
                ) : contacts.length === 0 ? (
                    <div className="px-6 py-12 text-center text-gray-400 italic">No contact submissions yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Name</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Email</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Phone</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Message</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-800">{contact.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`mailto:${contact.email}`} className="text-sm text-[#153e64] hover:underline">
                                                {contact.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`tel:${contact.phone}`} className="text-sm text-gray-600 hover:underline">
                                                {contact.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-sm text-gray-600 line-clamp-3">{contact.message}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(contact.id)}
                                                className="px-3 py-1.5 text-red-600 font-bold hover:bg-red-50 rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
