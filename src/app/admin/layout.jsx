"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
        { name: "Dashboard", icon: "📊", path: "/admin" },
        { name: "Testimonials", icon: "💬", path: "/admin/testimonials" },
        { name: "Rooms", icon: "🏨", path: "/admin/rooms" },
        { name: "Packages", icon: "🎒", path: "/admin/packages" },
        { name: "Bookings", icon: "📅", path: "/admin/bookings" },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            <Toaster position="top-center" />


            <aside className={`bg-[#153e64] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#153e64] font-bold">D</div>
                    {sidebarOpen && <span className="text-xl font-serif font-bold">Admin</span>}
                </div>

                <nav className="flex-1 mt-6">
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.path}>
                            <div className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/10 transition ${pathname === item.path ? 'bg-white/15 border-r-4 border-white' : ''}`}>
                                <span className="text-xl">{item.icon}</span>
                                {sidebarOpen && <span>{item.name}</span>}
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 text-white/70 hover:text-white transition w-full"
                    >
                        <span className="text-xl">🚪</span>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>


            <div className="flex-1 flex flex-col">
                <header className="bg-white h-20 border-b flex items-center justify-between px-8 shadow-sm">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 text-2xl">
                        ☰
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800">Admin User</p>
                            <p className="text-xs text-gray-500">Dhankhar Dragons</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#153e64] text-white flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </header>

                <main className="p-8 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
