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
    <section className="bg-[#EAF3F8] pt-0 pb-0 relative overflow-hidden">

      <div className="bg-[#F4B24E] py-4 mb-12 relative z-20">
        <h2 className="text-center text-3xl uppercase font-serif text-[#7A1F1F] tracking-wide">
          Testimonial
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative pb-8">

        <div className="hidden lg:block absolute left-24 -top-12 z-30 pointer-events-none">
          <Image
            src="/Home page/dragon.png"
            alt="Dragon decoration"
            width={180}
            height={180}
            className="opacity-90"
          />
        </div>

        <div className="hidden lg:block absolute right-24 -top-12 z-30 pointer-events-none">
          <Image
            src="/Home page/dragon.png"
            alt="Dragon decoration"
            width={180}
            height={180}
            className="opacity-90 scale-x-[-1]"
          />
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          centeredSlides
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => {
            const initial = item.name ? item.name.charAt(0).toUpperCase() : "G";
            return (
              <SwiperSlide key={item.id}>
                {({ isActive }) => (
                  <div
                    className={`rounded-2xl transition-all duration-500 h-full relative z-20 overflow-hidden flex flex-col items-center ${isActive
                      ? "bg-[#1F567D] text-white scale-105 shadow-xl"
                      : "bg-[#D9E1E8] text-gray-800 scale-95"
                      }`}
                    style={{ paddingTop: "2rem", paddingBottom: "1.5rem" }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #F4B24E 0%, #E8932C 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(244, 178, 78, 0.4)",
                        border: isActive ? "3px solid #fff" : "3px solid #1F567D",
                        flexShrink: 0,
                      }}
                    >
                      {initial}
                    </div>

                    <div className="mt-3 text-center">
                      <p className="font-semibold text-base">{item.name}</p>
                      <span className="text-yellow-400 text-sm">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </span>
                    </div>

                    <div className="px-5 pt-3 pb-2 text-center flex-1">
                      <p className="text-sm leading-relaxed italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="relative w-full h-[300px] -mt-16">
        <Image
          src="/Home page/Testimonials/ChatGPT Image Jan 19, 2026, 11_45_22 AM.png"
          alt="Mountain landscape"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF3F8] via-transparent to-transparent" />
      </div>
    </section>
  );
}
