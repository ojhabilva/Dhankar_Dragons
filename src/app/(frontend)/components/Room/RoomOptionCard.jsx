"use client";

import { useRouter } from "next/navigation";

export default function RoomOptionCard({ title, price, features }) {
  const router = useRouter();

  const handleSelectRoom = () => {
    router.push("/booking");
  };

  return (
    <div className="border bg-[#f3f5f1] shadow-sm p-6 flex justify-between gap-6">

      {/* LEFT CONTENT */}
      <div>
        <h3 className="text-xl font-serif text-gray-800 font-semibold mb-3">
          {title}
        </h3>

        <ul className="text-sm text-gray-700 space-y-1">
          {features.map((item, i) => (
            <li key={i}>▪ {item}</li>
          ))}
        </ul>

        <p className="text-green-700 text-sm mt-2">
          Free cancellation before 20 Jan, 2026
        </p>

        <button className="text-red-600 text-sm mt-1">
          View Facilities
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="text-right min-w-[180px]">
        <p className="text-3xl font-bold text-gray-900">₹ {price}</p>
        <p className="text-xs text-gray-600">+ taxes & fees</p>
        <p className="text-sm font-semibold text-gray-700 mt-1">Per Night</p>

        <button
          onClick={handleSelectRoom}
          className="mt-3 bg-[#1f4d73] text-white px-6 py-2 rounded hover:bg-[#163a56] transition"
        >
          SELECT ROOM
        </button>
      </div>
    </div>
  );
}
