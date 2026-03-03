"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HomeImg from "../../../public/Home page/Hero image/Home.jpg";
import DanceImg from "../../../public/Home page/Elevate your escape/danceImg.png"
import WorkImg1 from "../../../public/Home page/Elevate your escape/Work1.jpg"
import WorkImg2 from "../../../public/Home page/Elevate your escape/Work2.jpg"
import BackgroungImg from "../../../public/Home page/Ride/background.png"
import Bike from "../../../public/Home page/Ride/bike.png"
import Hourse from "../../../public/Home page/Ride/hourse.png"
import Car from "../../../public/Home page/Ride/car.png"
import Gallery from "../(frontend)/components/Gallery/Gallery"
import RoomCard from "../(frontend)/components/Room/RoomCard"
import TestimonialSlider from "../(frontend)/components/TestimonialSider/TestimonialSlider"
import Link from "next/link";



export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <section className="HeroImg relative w-full h-[50vh] md:h-[77vh] overflow-hidden">
        <Image
          src={HomeImg}
          alt="Resort"
          fill
          priority
          className="object-contain lg:object-cover"
        />
      </section>
      <section className="Elevate Your Escape max-w-7xl mx-auto px-4 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT IMAGE */}
          <div className="w-full h-full">
            <Image
              src={DanceImg}  // replace with your image
              alt="Ladakh culture"
              width={700}
              height={900}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-8">

            {/* TEXT CONTENT */}
            <div>
              <h2 className="text-2xl md:text-4xl font-serif font-semibold mb-4">
                Elevate Your Escape
              </h2>
              <p className="text-gray-600 leading-relaxed">
                In the cradle of the great Himalayas, surrounded by the spectacular
                setting of Ladakh, waiting to welcome you to an incredible experience
                of the old mountain kingdom. Located in the heart of the ancient city
                of Leh. So prepare to be pampered like never before. You are, after
                all, on top of the world.
              </p>
            </div>

            {/* BOTTOM IMAGES */}
            <div className="grid grid-cols-2 gap-6">
              <Image
                src={WorkImg1}
                alt="Local artisan"
                width={350}
                height={250}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Image
                src={WorkImg2}
                alt="Ladakh people"
                width={350}
                height={250}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

          </div>
        </div>
      </section>
      <section className=" enjoyHoliday   relative w-full py-5">

        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={BackgroungImg}
            alt="Mountains background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold italic text-blue-900 mb-8 md:mb-16">
          Enjoy your Holidays
        </h2>

        {/* Circular Images */}
        <div className="flex items-center justify-center gap-4 md:gap-14 flex-wrap px-4">

          {/* Left Circle */}
          <div className="w-32 h-32 md:w-56 md:h-56 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={Bike}
              alt="Bike tour"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Circle (Bigger) */}
          <div className="w-44 h-44 md:w-80 md:h-80 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={Hourse}
              alt="Horse trekking"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Circle */}
          <div className="w-32 h-32 md:w-56 md:h-56 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={Car}
              alt="Road trip"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
      <Gallery />
      <section className="max-w-7xl mx-auto px-3 ">
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl md:text-4xl font-serif text-gray-500 mb-4 md:mb-8">
            CHOOSE YOUR ROOM
          </h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
              {loading ? (
                <p className="text-gray-400 italic">Finding perfect rooms for you...</p>
              ) : rooms.length > 0 ? (
                rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    slug={room.slug}
                    image={room.image}
                    title={room.name}
                    capacity={room.capacity}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic">No rooms available at the moment.</p>
              )}
            </div>
            {!loading && rooms.length > 0 && (
              <div className="flex justify-center -mt-4 relative z-10">
                <Link href="/rooms/regular">
                  <button className="bg-[#8B1C1C] hover:bg-[#6f1515] text-white px-8 py-3 rounded-lg font-bold text-lg tracking-wide transition shadow-lg">
                    BOOK NOW
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <TestimonialSlider />
      <section className="relative w-full h-[350px] md:h-[500px] overflow-hidden">

        {/* Background Image */}
        <Image
          src="/Home page/camera.jpg"
          alt="Connect with us"
          fill
          className="object-cover"
          priority
        />

        {/* Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-12">
          <h2 className="text-2xl font-serif mb-4">
            CONNECT WITH US
          </h2>

          {/* Social Links */}
          <div className="flex gap-4">

            {/* Facebook */}
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              aria-label="Facebook"
              className="hover:scale-110 transition"
            >
              <img src="/Home page/icons/facebook-color-svgrepo-com 1.svg" alt="Facebook" className="w-9" />
            </Link>

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              className="hover:scale-110 transition"
            >
              <img src="/Home page/icons/instagram-1-svgrepo-com 1.svg" alt="Instagram" className="w-9" />
            </Link>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/910000000000"
              target="_blank"
              aria-label="WhatsApp"
              className="hover:scale-110 transition"
            >
              <img src="/Home page/icons/whatsapp-whats-app-svgrepo-com 1.svg" alt="WhatsApp" className="w-9" />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
