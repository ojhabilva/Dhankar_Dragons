"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ConnectWithUs from "../../components/Connect-us/ConnectWithUS";

export default function PackageDetailsPage() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`/api/packages/${id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data && !data.msg) setPkg(data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    const parseImages = (imageField) => {
        if (!imageField) return [];
        try {
            const parsed = JSON.parse(imageField);
            return Array.isArray(parsed) ? parsed : [imageField];
        } catch {
            return imageField ? [imageField] : [];
        }
    };

    const images = pkg ? parseImages(pkg.image) : [];

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, goToPrev, goToNext]);

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

    const coverImage = images[0] || "";

    return (
        <section className="bg-white">
            <div className="relative h-[60vh] w-full">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No image available
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-start">
                    <div className="mt-16 ml-10 bg-white/80 px-6 py-4">
                        <h2 className="text-xl font-serif uppercase tracking-wide">
                            {pkg.name}
                        </h2>
                    </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-lg font-bold text-[#8B1C1C] shadow-lg">
                    ₹{pkg.price?.toLocaleString?.() || pkg.price}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 text-center">
                <h2 className="text-2xl font-serif font-semibold">
                    {pkg.name}
                </h2>
            </div>

            {images.length > 1 && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mb-10">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={src}
                                alt={`${pkg.name} - Image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                        </div>
                    ))}
                </div>
            )}

            {pkg.description && (
                <div className="max-w-6xl mx-auto px-6 pb-10">
                    <h3 className="text-center text-xl font-serif font-semibold mb-6">
                        PACKAGE DETAILS
                    </h3>
                    <div
                        className="max-w-4xl mx-auto text-sm text-gray-800 leading-relaxed prose prose-sm
                            prose-headings:font-serif prose-headings:text-gray-900
                            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
                            prose-p:mb-3 prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4
                            prose-strong:font-bold prose-b:font-bold"
                        dangerouslySetInnerHTML={{ __html: pkg.description }}
                    />
                </div>
            )}

            {pkg.terms_and_conditions && (
                <div className="max-w-6xl mx-auto px-6 pb-12">
                    <div className="max-w-4xl mx-auto">
                        <h4 className="font-semibold text-gray-800 mb-4 uppercase tracking-wider text-sm border-b pb-2">Terms & Conditions:</h4>
                        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
                            {(() => {
                                try {
                                    const terms = JSON.parse(pkg.terms_and_conditions);
                                    return Array.isArray(terms) ? terms.map((term, i) => (
                                        <li key={i}>{term}</li>
                                    )) : null;
                                } catch (e) {
                                    return null;
                                }
                            })()}
                        </ul>
                    </div>
                </div>
            )}

            <div className="mt-12">
                <Link href="/booking" title="Book this package">
                    <button className="w-full bg-[#163e63] text-white py-4 text-lg font-semibold hover:bg-[#0f2e4a] transition" title="Book Now">
                        Book Now
                    </button>
                </Link>
            </div>
            <ConnectWithUs />

            {lightboxOpen && images.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white text-4xl font-bold z-10 hover:text-gray-300 transition"
                        onClick={closeLightbox}
                        title="Close lightbox"
                    >
                        ✕
                    </button>

                    {images.length > 1 && (
                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition"
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            title="Previous image"
                        >
                            ‹
                        </button>
                    )}

                    <div
                        className="relative w-full h-full max-w-5xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${pkg.name} - Full view`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {images.length > 1 && (
                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition"
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            title="Next image"
                        >
                            ›
                        </button>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium z-10">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </section>
    );
}
