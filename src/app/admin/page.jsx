"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        testimonials: 0,
        rooms: 0,
        bookings: 0,
        packages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCount = (data) => {
            if (Array.isArray(data)) return data.length;
            if (data && Array.isArray(data.data)) return data.data.length;
            return 0;
        };

        const safeFetch = async (url, headers) => {
            try {
                const res = await fetch(url, { headers });
                if (!res.ok) return 0;
                const data = await res.json();
                return getCount(data);
            } catch {
                return 0;
            }
        };

        const fetchStats = async () => {
            const headers = { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` };

            const [testimonials, rooms, bookings, packages] = await Promise.all([
                safeFetch("/api/testimonials?all=true", headers),
                safeFetch("/api/rooms", headers),
                safeFetch("/api/bookings", headers),
                safeFetch("/api/packages", headers),
            ]);

            setStats({ testimonials, rooms, bookings, packages });
            setLoading(false);
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: "Active Rooms", value: stats.rooms, color: "bg-green-500", icon: "🏨", href: "/admin/rooms" },
        { name: "Total Bookings", value: stats.bookings, color: "bg-[#8B1C1C]", icon: "📅", href: "/admin/bookings" },
        { name: "Tour Packages", value: stats.packages, color: "bg-amber-500", icon: "🎒", href: "/admin/packages" },
        { name: "Testimonials", value: stats.testimonials, color: "bg-blue-500", icon: "💬", href: "/admin/testimonials" },
    ];

    const quickLinks = [
        { label: "Manage Rooms", href: "/admin/rooms", color: "bg-[#153e64]/5 hover:bg-[#153e64]/10 text-[#153e64]" },
        { label: "View Bookings", href: "/admin/bookings", color: "bg-[#8B1C1C]/5 hover:bg-[#8B1C1C]/10 text-[#8B1C1C]" },
        { label: "Add Testimonial", href: "/admin/testimonials", color: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
        { label: "Manage Packages", href: "/admin/packages", color: "bg-amber-50 hover:bg-amber-100 text-amber-700" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1 italic">Welcome back to Dhankhar Dragons Admin.</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link key={stat.name} href={stat.href}>
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition cursor-pointer group">
                            <div>
                                <p className="text-gray-500 font-semibold text-sm">{stat.name}</p>
                                <h3 className="text-4xl font-bold text-gray-800 mt-1">
                                    {loading ? <span className="text-2xl text-gray-300">—</span> : stat.value}
                                </h3>
                            </div>
                            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition`}>
                                {stat.icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-serif font-bold text-gray-800 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✨</div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">System Ready</p>
                                <p className="text-xs text-gray-500">Admin panel initialized successfully</p>
                            </div>
                        </div>
                        <p className="text-center text-gray-400 text-sm py-4 italic">Check Bookings for latest reservations.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-serif font-bold text-gray-800 mb-6">Quick Links</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {quickLinks.map((link) => (
                            <Link key={link.label} href={link.href}>
                                <div className={`p-4 rounded-2xl ${link.color} font-bold transition text-center cursor-pointer`}>
                                    {link.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
