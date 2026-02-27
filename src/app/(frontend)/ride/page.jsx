"use client";
import { useState } from "react";
import Image from "next/image";
import BookingPopup from "../components/RideComponents/BookingPopup";
import ConnectSection from "../components/RideComponents/connect";

export default function RideServices() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");

  const handleOpen = (type) => {
    setService(type);
    setOpen(true);
  };

  const services = [
    {
      title: "PONY RENTAL SERVICE",
      img: "/Home page/Ride/hourse.png",
      text: [
        "At our hotel, we curate experiences that celebrate the heritage and natural beauty of the mountains.",
        "Each pony is carefully selected, professionally trained, and maintained to the highest standards.",
        "By partnering closely with the local community, we offer a rare opportunity to experience the mountains."
      ],
    },
    {
      title: "CAR RENTAL SERVICE",
      img: "/Home page/Ride/car.png",
      text: [
        "Our luxury car rental service is designed to offer guests effortless mobility.",
        "Each vehicle in our fleet is carefully selected and impeccably maintained.",
        "Blending reliability with refined hospitality, our service ensures confidence."
      ],
    },
    {
      title: "BIKE RENTAL SERVICE",
      img: "/Home page/Ride/bike.png",
      text: [
        "Our premium bike rental service offers an exceptional way to explore the mountains.",
        "Our fleet is meticulously maintained for safety and performance.",
        "Blending adventure with luxury hospitality standards."
      ],
    },
  ];

  return (
    <>
      {services.map((item, index) => (
        <div key={index} className="max-w-6xl mx-auto py-12 border-b">
          <h2 className="text-center font-serif text-xl mb-8">
            {item.title}
          </h2>

          {/* CARD */}
          <div className="grid md:grid-cols-2 gap-8 px-6 items-stretch">
            
            {/* IMAGE */}
            <div className="relative w-full h-full min-h-[320px]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-between h-full text-sm text-gray-800">
              <div className="space-y-4 leading-relaxed">
                {item.text.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* BUTTON – CONTENT SIDE */}
              <div className="mt-6">
                <button
                  onClick={() => handleOpen(item.title)}
                  className="bg-[#153e64] text-white px-8 py-2 rounded-md hover:bg-[#0f2e4a] transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* POPUP */}
      <BookingPopup
        open={open}
        onClose={() => setOpen(false)}
        service={service}
      />

      <ConnectSection />
    </>
  );
}
