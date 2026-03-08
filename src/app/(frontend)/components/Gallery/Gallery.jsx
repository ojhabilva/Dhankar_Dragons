"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const categories = [
  { key: "rooms", label: "ROOMS" },
  { key: "dining", label: "DINING AREA" },
  { key: "scenic", label: "SCENIC VIEW" },
  { key: "reception", label: "RECEPTION" },
];

export default function Gallery() {
  const [active, setActive] = useState("rooms");
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const grouped = {};
        categories.forEach((cat) => {
          grouped[cat.key] = [];
        });
        data.forEach((img) => {
          if (grouped[img.category]) {
            grouped[img.category].push(img.image);
          }
        });
        setGalleryData(grouped);
      } catch {
        setGalleryData({});
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const currentImages = galleryData[active] || [];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

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

  return (
    <>
      <section className="flex justify-center py-6 md:py-10 px-2">
        <div className="w-full max-w-7xl bg-[#aab9bf] rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl flex flex-col md:flex-row gap-4 md:gap-8">

          <div className="md:w-64 bg-[#6b818c] rounded-xl md:rounded-2xl p-3 md:p-6 flex-shrink-0">
            <h2 className="text-white text-2xl md:text-4xl mb-3 md:mb-8 font-semibold">
              Gallery
            </h2>

            <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto no-scrollbar">
              {categories.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`px-4 py-2 md:py-3 rounded-xl text-left transition font-medium whitespace-nowrap text-sm md:text-base
                    ${active === item.key
                      ? "bg-[#4d646f] text-white"
                      : "text-gray-200 hover:bg-[#5f7884]"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center h-48">
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : currentImages.length === 0 ? (
              <div className="col-span-full flex items-center justify-center h-48 text-white/60 italic text-sm">
                No images in this category yet.
              </div>
            ) : (
              currentImages.map((src, index) => (
                <div
                  key={index}
                  className="relative h-32 md:h-48 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={src}
                    alt={`${active}-${index}`}
                    fill
                    className="object-cover hover:scale-110 transition duration-300"
                    priority={index < 2}
                  />
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {lightboxOpen && currentImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold z-10 hover:text-gray-300 transition"
            onClick={closeLightbox}
          >
            ✕
          </button>

          {currentImages.length > 1 && (
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            >
              ‹
            </button>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImages[currentIndex]}
              alt="Full view"
              fill
              className="object-contain"
              priority
            />
          </div>

          {currentImages.length > 1 && (
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              ›
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium z-10">
            {currentIndex + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </>
  );
}
