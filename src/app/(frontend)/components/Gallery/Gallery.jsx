"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryData } from "./galleryData";

const categories = [
  { key: "rooms", label: "ROOMS" },
  { key: "dining", label: "DINING AREA" },
  { key: "scenic", label: "SCENIC VIEW" },
  { key: "reception", label: "RECEPTION" },
];

export default function Gallery() {
  const [active, setActive] = useState("rooms");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section className="flex justify-center py-10">
        <div className="w-[95%] max-w-7xl bg-[#aab9bf] rounded-3xl p-8 shadow-xl flex gap-8">

          {/* Left Menu */}
          <div className="w-64 bg-[#6b818c] rounded-2xl p-6">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              Gallery
            </h2>

            <div className="flex flex-col gap-3">
              {categories.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`px-4 py-3 rounded-xl text-left transition font-medium
                    ${
                      active === item.key
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

          {/* Image Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryData[active].map((src, index) => (
              <div
                key={index}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`${active}-${index}`}
                  fill
                  className="object-cover hover:scale-110 transition duration-300"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FULL SCREEN MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Full view"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
