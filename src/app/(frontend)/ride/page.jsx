"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import BookingPopup from "../components/RideComponents/BookingPopup";
import ConnectSection from "../components/RideComponents/connect";

export default function RideServices() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/rentals");
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data.filter(s => s.is_active === 1));
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#153e64] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-24 md:pt-32 pb-12">
        <h1 className="text-center font-serif text-3xl md:text-5xl text-[#153e64] mb-4" title="Rental Services">
          RENTAL SERVICES
        </h1>
        <p className="text-center text-gray-500 max-w-2xl mx-auto px-4 italic">
          Explore the serene mountains of Spiti with our curated rental options.
        </p>
      </div>

      {services.length > 0 ? (
        services.map((item, index) => (
          <div key={item.id || index} className="max-w-6xl mx-auto py-12 border-b last:border-b-0">
            <h2 className="text-center font-serif text-2xl mb-8 uppercase text-gray-800" title={`${item.type} Rental Service`}>
              {item.type} RENTAL SERVICE
            </h2>

            <div className="grid md:grid-cols-2 gap-10 px-6 items-center">

              <div className="relative w-full aspect-[4/3] md:h-[350px] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={item.image}
                  alt={item.type}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div className="space-y-4 text-gray-600 leading-relaxed whitespace-pre-line text-base">
                  <p>{item.about}</p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => handleOpen(item)}
                    className="bg-[#153e64] text-white px-10 py-3 rounded-xl hover:bg-[#0f2e4a] transition-all transform hover:-translate-y-0.5 shadow-md font-bold"
                    title={`Book ${item.type} ride`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-32 text-center">
          <p className="text-gray-400 italic text-xl">No rental services available right now.</p>
        </div>
      )}

      <BookingPopup
        open={open}
        onClose={() => setOpen(false)}
        service={selectedService}
      />

      <ConnectSection />
    </>
  );
}
