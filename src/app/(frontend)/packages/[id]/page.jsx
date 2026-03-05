"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ConnectWithUs from "../../components/Connect-us/ConnectWithUS";

export default function PackageDetailsPage() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/packages/${id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data && !data.msg) setPkg(data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-400 italic text-lg">Loading package details...</p>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500 text-lg">Package not found.</p>
                <Link href="/packages" className="text-[#153e64] font-bold hover:underline">
                    ← Back to Packages
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-white">
            <div className="relative h-[60vh] w-full">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-start">
                    <div className="mt-16 ml-10 bg-white/80 px-6 py-4">
                        <h2 className="text-xl font-serif uppercase tracking-wide">
                            {pkg.name}
                        </h2>
                        <p className="text-sm mt-1">{pkg.duration}</p>
                    </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-lg font-bold text-[#8B1C1C] shadow-lg">
                    ₹{pkg.price?.toLocaleString?.() || pkg.price}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 text-center">
                <h2 className="text-2xl font-serif font-semibold">
                    {pkg.name}: {pkg.duration}
                </h2>
            </div>

            {pkg.description && (
                <div className="max-w-6xl mx-auto px-6 pb-10">
                    <h3 className="text-center text-xl font-serif font-semibold mb-6">
                        PACKAGE DETAILS
                    </h3>
                    <div className="max-w-4xl mx-auto text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {pkg.description}
                    </div>
                </div>
            )}

            <div className="mt-12">
                <Link href="/booking">
                    <button className="w-full bg-[#163e63] text-white py-4 text-lg font-semibold hover:bg-[#0f2e4a] transition">
                        Book Now
                    </button>
                </Link>
            </div>
            <ConnectWithUs />
        </section>
    );
}
