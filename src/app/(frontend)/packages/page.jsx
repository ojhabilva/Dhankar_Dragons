"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PackagesPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/packages")
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setPackages(data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-[#f5f5f0] min-h-screen">
            {/* Hero */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src="/Home page/packages/summer/Firefly (1) 1.png"
                    alt="Spiti Valley Packages"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-serif font-bold mb-3">Tour Packages</h1>
                        <p className="text-lg text-white/80 italic">Curated experiences across Spiti Valley</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Static Featured Packages */}
                <div className="mb-12">
                    <h2 className="text-3xl font-serif font-bold text-[#153e64] mb-2">Featured Packages</h2>
                    <p className="text-gray-500 italic mb-8">Our most popular curated Spiti Valley journeys</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PackageCard
                            title="Summer Spiti Explorer"
                            subtitle="Diversity of Spiti Valley"
                            duration="6 Nights / 7 Days"
                            price="₹ Contact for Pricing"
                            image="/Home page/packages/summer/Firefly (1) 1.png"
                            href="/packages/summer"
                            season="Summer"
                        />
                        <PackageCard
                            title="Winter Spiti Expedition"
                            subtitle="The Frozen Kingdom"
                            duration="5 Nights / 6 Days"
                            price="₹ Contact for Pricing"
                            image="/Home page/packages/summer/Ki (Key) Monastery 01 1.png"
                            href="/packages/winter"
                            season="Winter"
                        />
                    </div>
                </div>

                {/* Dynamic Packages from Admin */}
                {loading ? (
                    <div className="text-center py-12 text-gray-400 italic">Loading packages...</div>
                ) : packages.length > 0 ? (
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-[#153e64] mb-2">Custom Packages</h2>
                        <p className="text-gray-500 italic mb-8">Specially curated experiences from our team</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#8B1C1C]">
                                            ₹{Number(pkg.price).toLocaleString("en-IN")}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif font-bold text-gray-800">{pkg.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{pkg.duration}</p>
                                        {pkg.description && (
                                            <p className="text-sm text-gray-600 mt-3 line-clamp-2">{pkg.description}</p>
                                        )}
                                        <Link href="/booking">
                                            <button className="mt-5 w-full bg-[#153e64] hover:bg-[#0d2a45] text-white font-bold py-2.5 rounded-xl transition">
                                                Book This Package
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* CTA */}
                <div className="mt-16 bg-[#153e64] rounded-3xl p-10 text-center text-white">
                    <h2 className="text-3xl font-serif font-bold mb-3">Can't Find What You're Looking For?</h2>
                    <p className="text-white/70 mb-6">Contact us to create a custom itinerary tailored just for you.</p>
                    <Link href="/contact">
                        <button className="bg-[#F4B24E] text-[#7A1F1F] font-bold px-10 py-3 rounded-full hover:bg-yellow-300 transition">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PackageCard({ title, subtitle, duration, price, image, href, season }) {
    const seasonColor = season === "Summer" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700";
    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${seasonColor}`}>
                    {season}
                </div>
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 italic mb-1">{subtitle}</p>
                <h3 className="text-xl font-serif font-bold text-gray-800">{title}</h3>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                        <p className="text-sm font-semibold text-gray-700">{duration}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting From</p>
                        <p className="text-sm font-semibold text-[#8B1C1C]">{price}</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Link href={href} className="flex-1">
                        <button className="w-full border-2 border-[#153e64] text-[#153e64] font-bold py-2.5 rounded-xl hover:bg-[#153e64] hover:text-white transition">
                            View Details
                        </button>
                    </Link>
                    <Link href="/booking" className="flex-1">
                        <button className="w-full bg-[#8B1C1C] hover:bg-[#6f1515] text-white font-bold py-2.5 rounded-xl transition">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
