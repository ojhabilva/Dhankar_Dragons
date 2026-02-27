"use client";

import { useState } from "react";
import Link from "next/link";

const menu = {
  Stay: [
    { name: "Standard Room", href: "/rooms/standard-room" },
    { name: "Deluxe Room", href: "/rooms/deluxe-room" },
    { name: "Super Deluxe Room", href: "/rooms/super-deluxe-room" },
  ],
  Ride: [
    { name: "Bike Ride", href: "/ride" },
    { name: "Car Ride", href: "/ride" },
    { name: "Horse Ride", href: "/ride" },
  ],
  Packages: [
    { name: "All Packages", href: "/packages" },
    { name: "Summer Spiti", href: "/packages/summer" },
    { name: "Winter Spiti", href: "/packages/winter" },
  ],
};

export default function NavItem({ title, mobile }) {
  const [open, setOpen] = useState(false);
  const items = menu[title];

  if (mobile) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between text-gray-800 font-medium hover:text-[#8B1C1C] transition"
        >
          {title}
          <span className="text-lg">{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className="ml-4 mt-2 space-y-2">
            {items.map((item) => (
              <Link key={item.name} href={item.href} className="block text-gray-600 hover:text-[#8B1C1C] transition py-1">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-pointer text-gray-800 font-medium hover:text-[#8B1C1C] transition select-none">
        {title} <span className="text-xs">▾</span>
      </span>

      {open && (
        <div className="absolute left-0 top-full pt-2 z-50 min-w-[180px]">
          <div className="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-5 py-3 text-gray-700 hover:bg-[#153e64] hover:text-white transition font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
