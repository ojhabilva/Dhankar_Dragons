"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));
                toast.success("Login successful!");
                router.push("/admin");
            } else {
                toast.error(data.msg || "Login failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-screen flex items-center justify-center bg-[#fdfaf5] bg-[url('/Dhankhar%20Dragons/camera.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-white rounded-2xl shadow-inner mb-4">
                        <Image src="/Dhankhar Dragons/dragon.png" alt="Dhankhar Dragons Logo" width={48} height={48} className="w-12 h-12 object-contain" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-[#153e64]">
                        Dhankhar Dragons Admin
                    </h2>
                    <p className="text-gray-500 mt-2 italic">Dhankhar Dragons</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 focus:ring-2 focus:ring-[#153e64] focus:border-transparent transition outline-none"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 focus:ring-2 focus:ring-[#153e64] focus:border-transparent transition outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#8B1C1C] hover:bg-[#6f1515] text-white font-bold py-3 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : "ACCESS DASHBOARD"}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Dhankhar Dragons. All rights reserved.
                </div>
            </div>
        </div>
    );
}
