"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const isAdminUser = localStorage.getItem("adminUser");


        if (!token && pathname !== "/admin/login") {
            router.push("/admin/login");
        } else if (token && pathname === "/admin/login") {
            router.push("/admin");
        } else {
            setLoading(false);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        toast.success("Logged out successfully");
        router.push("/admin/login");
    };

    if (loading && pathname !== "/admin/login") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
                <div className="w-12 h-12 border-4 border-[#153e64]/20 border-t-[#153e64] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (pathname === "/admin/login") {
        return (
            <>
                <Toaster position="top-center" />
                <main className="min-h-screen">{children}</main>
            </>
        );
    }

    const menuItems = [
        { name: "Dashboard", icon: "📊", path: "/admin", title: "Dashboard" },
        { name: "Testimonials", icon: "💬", path: "/admin/testimonials", title: "Testimonials" },
        { name: "Rooms", icon: "🏨", path: "/admin/rooms", title: "Rooms" },
        { name: "Packages", icon: "🎒", path: "/admin/packages", title: "Packages" },
        { name: "Rentals", icon: "🚲", path: "/admin/rentals", title: "Rental Services" },
        { name: "Room Bookings", icon: "🛎️", path: "/admin/bookings", title: "Room Bookings" },
        { name: "Rental Bookings", icon: "📝", path: "/admin/rental-bookings", title: "Rental Bookings" },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            <Toaster position="top-center" />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`bg-[#153e64] text-white transition-all duration-300 flex flex-col
                fixed top-0 left-0 h-full z-50 lg:static lg:z-auto
                ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'}`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#153e64] font-bold">⚙️</div>
                    <span className="text-xl font-serif font-bold lg:hidden block">Menu</span>
                    {sidebarOpen && <span className="text-xl font-serif font-bold hidden lg:block">Menu</span>}
                </div>

                <nav className="flex-1 mt-6">
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.path} onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}>
                            <div className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/10 transition ${pathname === item.path ? 'bg-white/15 border-r-4 border-white' : ''}`}>
                                <span className="text-xl">{item.icon}</span>
                                <span className="lg:hidden block" title={item.title}>{item.name}</span>
                                {sidebarOpen && <span className="hidden lg:block" title={item.title}>{item.name}</span>}
                            </div>
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-4 text-white/70 hover:text-white text-center border-t border-white/10"
                >
                    ✕ Close Menu
                </button>
            </aside>


            <div className="flex-1 flex flex-col w-full">
                <header className="bg-white h-16 lg:h-20 border-b flex items-center justify-between px-4 lg:px-8 shadow-sm">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 text-2xl">
                        ☰
                    </button>

                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800">Admin Panel</p>
                            <p className="text-xs text-gray-500">Dhankhar Dragons</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 lg:px-4 py-2 text-sm text-gray-600 bg-orange-100 hover:text-white hover:bg-red-500 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-8 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowLogoutModal(false)}
                    />
                    <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-300 border border-gray-100">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner ring-4 ring-red-50/50">
                            👋
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Wait a moment!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">Are you sure you want to end your session? We'd hate to see you go!</p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={confirmLogout}
                                className="w-full bg-[#153e64] hover:bg-[#0d2a44] text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
                            >
                                Yes, Log Me Out
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-95"
                            >
                                Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
