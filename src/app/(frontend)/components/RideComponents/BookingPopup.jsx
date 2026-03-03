"use client";

export default function BookingPopup({ open, onClose, service }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Popup Box */}
      <div className="relative bg-[#8b1e1e] w-[90%] max-w-sm p-6 text-white z-10">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        <h2 className="text-center font-serif text-lg mb-1">
          PLAN YOUR ESCAPE TODAY
        </h2>

        <p className="text-center text-xs mb-6">{service}</p>

        <form className="space-y-4">
          <input
            placeholder="Your Name"
            className="w-full bg-white/20 border-b border-white outline-none py-2 px-2 placeholder-white/80"
          />

          <input
            type="email"
            placeholder="E-Mail"
            className="w-full bg-white/20 border-b border-white outline-none py-2 px-2 placeholder-white/80"
          />

          <input
            placeholder="Phone No."
            className="w-full bg-white/20 border-b border-white outline-none py-2 px-2 placeholder-white/80"
          />

          <input
            type="date"
            placeholder="Select a date"
            className="w-full bg-white/20 border-b border-white outline-none py-2 px-2 placeholder-white/80"
          />

          <button
            type="submit"
            className="w-full bg-[#f0b34d] text-black py-2 rounded-full mt-6 font-semibold"
          >
            Submit
          </button>
        </form>

        <div className="text-xs text-center mt-6">
          <p>For Immediate Assistance</p>
          <p>Call: +91 000 000 000</p>
          <p>Email: xyz@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
