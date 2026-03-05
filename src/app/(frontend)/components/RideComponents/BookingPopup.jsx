import { useState } from "react";
import toast from "react-hot-toast";

export default function BookingPopup({ open, onClose, service }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    booking_date: ""
  });

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service) return;

    setLoading(true);
    try {
      const res = await fetch("/api/rental-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rental_service_id: service.id
        })
      });

      if (res.ok) {
        toast.success("Booking request submitted! We will contact you soon.");
        setFormData({ customer_name: "", customer_email: "", customer_phone: "", booking_date: "" });
        onClose();
      } else {
        toast.error("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#8b1e1e] w-[95%] max-w-md p-8 text-white z-10 rounded-2xl shadow-2xl overflow-hidden border border-white/10">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
        >
          ✕
        </button>

        <h2 className="text-center font-serif text-2xl mb-2 tracking-wide uppercase">
          Plan Your Escape
        </h2>

        <p className="text-center text-sm font-medium mb-8 bg-black/20 py-2 rounded-lg capitalize border border-white/5">
          {service?.type} Rental Service
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          <input
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            placeholder="Your Name"
            className="w-full bg-white/10 border border-white/20 rounded-lg outline-none py-3 px-4 placeholder:text-white placeholder:opacity-100 text-white focus:bg-white/20 focus:border-white transition-all shadow-inner"
          />

          <input
            required
            type="email"
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            placeholder="Your E-Mail"
            className="w-full bg-white/10 border border-white/20 rounded-lg outline-none py-3 px-4 placeholder:text-white placeholder:opacity-100 text-white focus:bg-white/20 focus:border-white transition-all shadow-inner"
          />

          <input
            required
            value={formData.customer_phone}
            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
            placeholder="Phone Number"
            className="w-full bg-white/10 border border-white/20 rounded-lg outline-none py-3 px-4 placeholder:text-white placeholder:opacity-100 text-white focus:bg-white/20 focus:border-white transition-all shadow-inner"
          />

          <div className="relative">
            <input
              required
              type="date"
              value={formData.booking_date}
              onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg outline-none py-3 px-4 text-white focus:bg-white/20 focus:border-white transition-all shadow-inner appearance-none inverse-calendar"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-white">📅</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f0b34d] hover:bg-[#e0a33d] disabled:bg-gray-400 disabled:cursor-not-allowed text-black py-3.5 rounded-xl mt-4 font-bold text-lg transition-all shadow-lg active:scale-95"
          >
            {loading ? "Submitting..." : "Book Now"}
          </button>
        </form>

        <div className="text-xs text-center mt-10 pt-6 border-t border-white/10 space-y-1 opacity-80">
          <p className="font-semibold text-white/90">For Immediate Assistance</p>
          <p>Call: +91 000 000 000</p>
          <p>Email: dhankardragons@gmail.com</p>
        </div>
      </div>

      <style jsx>{`
        input::placeholder {
          color: white !important;
          opacity: 1 !important;
        }
        .inverse-calendar::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
        }
        /* Fix for date input default text color in some browsers */
        input[type="date"] {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
}
