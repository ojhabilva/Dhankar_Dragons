"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const isAdminUser = localStorage.getItem("adminUser");

        console.log(`[AdminLayout] Path: ${pathname}`);
        console.log(`[AdminLayout] Token: ${token ? "Present (Starts with " + token.substring(0, 10) + "...)" : "Missing"}`);
        console.log(`[AdminLayout] User: ${isAdminUser ? "Present" : "Missing"}`);

        if (!token && pathname !== "/admin/login") {
            console.log("[AdminLayout] Redirecting to /admin/login because token is missing");
            router.push("/admin/login");
        } else if (token && pathname === "/admin/login") {
            console.log("[AdminLayout] Redirecting to /admin because token is present on login page");
            router.push("/admin");
        } else {
            console.log("[AdminLayout] Authorization check passed");
            setLoading(false);
        }
    }, [pathname, router]);

    const handleLogout = () => {
        const confirmed = window.confirm("Do you want to logout?");
        if (!confirmed) return;
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
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
        { name: "Rental Bookings", icon: "📝", path: "/admin/rental-bookings", title: "Rental Bookings" },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            <Toaster position="top-center" />

            {/* Mobile overlay */}
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

                {/* Close button on mobile */}
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
        </div>
    );
}
