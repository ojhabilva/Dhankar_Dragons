"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingPopup from "./Bookingpopup";

export default function BookingBar() {
  const router = useRouter();

  const [popupOpen, setPopupOpen] = useState(false);
  const [roomMenuOpen, setRoomMenuOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [dateRange, setDateRange] = useState(null);
  const [roomCount, setRoomCount] = useState(1);
  const [adults, setAdults] = useState(2);
  const [child, setChild] = useState(0);

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRooms(data);
      })
      .catch(() => { });
  }, []);

  const handleBookNow = (room) => {
    setRoomMenuOpen(false);
    const params = new URLSearchParams();
    params.set("room", room.name);
    params.set("slug", room.slug);
    if (dateRange?.from) params.set("checkin", dateRange.from.toISOString().split("T")[0]);
    if (dateRange?.to) params.set("checkout", dateRange.to.toISOString().split("T")[0]);
    params.set("adults", adults);
    params.set("children", child);
    params.set("rooms", roomCount);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <>
      {/* FIXED BAR */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#e9e9e9] border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between relative">

          {/* DATE */}
          <div
            onClick={() => { setPopupOpen(true); setRoomMenuOpen(false); }}
            className="flex items-center gap-3 bg-white px-4 py-2 rounded cursor-pointer"
          >
            <Image src="/Home page/icons/calendar-svgrepo-com 4.svg" alt="calendar" width={30} height={30} />
            <div>
              <p className="text-xs text-gray-500">CHECK IN - CHECK OUT</p>
              <p className="font-semibold text-sm">
                {dateRange?.from
                  ? `${dateRange.from.toDateString()} → ${dateRange.to?.toDateString() || ""}`
                  : "Select dates"}
              </p>
            </div>
          </div>

          {/* GUESTS */}
          <div
            onClick={() => { setPopupOpen(true); setRoomMenuOpen(false); }}
            className="bg-white px-4 py-2 rounded cursor-pointer"
          >
            <p className="text-xs text-gray-500">GUESTS</p>
            <p className="font-semibold text-sm">
              {roomCount} Room · {adults} Adults · {child} Child
            </p>
          </div>

          {/* BOOK NOW */}
          <div className="relative">
            <button
              onClick={() => { setRoomMenuOpen(!roomMenuOpen); setPopupOpen(false); }}
              className="bg-[#8B1C1C] text-[#F4C430] font-bold px-8 py-3 rounded-full"
            >
              BOOK NOW
            </button>

            {/* ROOM OPTIONS (Dynamic) */}
            {roomMenuOpen && (
              <div className="absolute right-0 bottom-14 w-64 bg-white rounded-xl shadow-xl overflow-hidden">
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <RoomItem
                      key={room.id}
                      label={room.name}
                      onClick={() => handleBookNow(room)}
                    />
                  ))
                ) : (
                  <p className="px-5 py-4 text-gray-500 text-sm italic">No rooms available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CALENDAR + COUNTER POPUP */}
      {popupOpen && (
        <BookingPopup
          onClose={() => setPopupOpen(false)}
          dateRange={dateRange}
          setDateRange={setDateRange}
          rooms={roomCount}
          setRooms={setRoomCount}
          adults={adults}
          setAdults={setAdults}
          child={child}
          setChild={setChild}
        />
      )}
    </>
  );
}

function RoomItem({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-5 py-4 cursor-pointer hover:bg-gray-100 font-medium"
    >
      {label}
    </div>
  );
}
