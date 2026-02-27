"use client";
import Image from "next/image";
import { useState } from "react";

export default function RoomGallery({ title, images }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="mt-16">
      <div className="bg-[#f6b65b] py-3 text-center">
        <h2 className="text-3xl font-serif text-[#8b1e1e]">{title}</h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="relative h-[420px]">
          <Image
            src={images[index]}
            fill
            className="object-cover rounded"
            alt={title}
          />
        </div>

        <button
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 text-4xl"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className="absolute right-4 top-1/2 text-4xl"
        >
          ›
        </button>
      </div>
    </div>
  );
}
