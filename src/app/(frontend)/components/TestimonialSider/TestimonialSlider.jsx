"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getImageSrc = (image) => {
    if (image && image.trim()) {
      if (image.startsWith("http")) return image;
      return `${BACKEND_URL}/uploads/${encodeURIComponent(image)}`;
    }
    return "/Home page/about/default-review.jpg";
  };



  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials", {
          cache: "no-store",
        });
        const result = await res.json();
        if (result.success) setTestimonials(result.data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading testimonials...
      </div>
    );
  }

  if (!testimonials.length) return null;

  return (
    <section className="bg-[#EAF3F8] py-20 relative overflow-hidden">

      {/* Title */}
      <div className="bg-[#F4B24E] py-4 mb-24 relative z-20">
        <h2 className="text-center text-3xl uppercase font-serif text-[#7A1F1F] tracking-wide">
          Testimonials
        </h2>
      </div>

      {/* Slider Wrapper */}
      <div className="max-w-6xl mx-auto px-4 relative">

        {/* Left Dragon */}
        <div className="hidden lg:block absolute left-24 -top-24 z-30 pointer-events-none">
          <Image
            src="/Home page/dragon.png"
            alt="Dragon decoration"
            width={220}
            height={220}
            className="opacity-90"
          />
        </div>

        {/* Right Dragon */}
        <div className="hidden lg:block absolute right-24 -top-24 z-30 pointer-events-none">
          <Image
            src="/Home page/dragon.png"
            alt="Dragon decoration"
            width={220}
            height={220}
            className="opacity-90 scale-x-[-1]"
          />
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          navigation
          centeredSlides
          loop
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <div
                  className={`rounded-2xl p-6 transition-all duration-500 h-full relative z-20 ${isActive
                    ? "bg-[#1F567D] text-white scale-105 shadow-xl"
                    : "bg-[#D9E1E8] text-gray-800 scale-95"
                    }`}
                >
                  {/* ✅ IMAGE (SAFE) */}
                  <Image
                    src={getImageSrc(item.image)}
                    alt={item.name || "Guest"}
                    width={400}
                    height={260}
                    unoptimized
                    className="rounded-xl mb-4 object-cover w-full h-[200px]"
                  />


                  {/* Name + Rating */}
                  <div className="bg-white text-black text-sm font-semibold rounded-full px-4 py-1 inline-flex items-center gap-2 mb-4">
                    <span>{item.name}</span>
                    <span className="text-yellow-400">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
