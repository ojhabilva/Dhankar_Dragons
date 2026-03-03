"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        if (Array.isArray(data)) setRooms(data.filter(r => r.is_active === 1));
      } catch (e) {
        console.error("Footer: failed to load rooms", e);
      }
    };
    fetchRooms();
  }, []);

  return (
    <footer className="bg-[#915609] text-white pb-24 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <Link
              href="/"
              className="flex flex-col items-start gap-3 group"
            >
              <Image
                src="/Home page/logo 1@2x.png"
                alt="Dhankar Dragons Logo"
                width={240}
                height={180}
                className="object-contain group-hover:scale-105 transition"
              />

              <div>
                <Image
                  src="/Home page/dhankhar dragons.png"
                  alt="Dhankar Dragons"
                  width={220}
                  height={60}
                  className="mb-1"
                />
                <p className="text-sm opacity-80">
                  Hotels and Restaurants
                </p>
              </div>
            </Link>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">BOOKING</h4>
            <ul className="space-y-2">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <li key={room.id}>
                    <Link href={`/rooms/${room.slug}`} className="hover:underline">
                      {room.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm opacity-60">No rooms available</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">
              Terms & Condition
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Cancellation & Refund Policies
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">CONTACT US</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+910000000000" className="hover:underline">
                  +91 0000 000 000
                </a>
              </li>
              <li>
                <a href="mailto:xyz@gmail.com" className="hover:underline">
                  xyz@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className=" text-center text-sm ">
        © ALL Rights Reserved Dhankar Dragons 2026.
      </div>
    </footer>
  );
}
