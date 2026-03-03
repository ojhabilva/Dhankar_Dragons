"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingPopup({
  onClose,
  dateRange,
  setDateRange,
  rooms,
  setRooms,
  adults,
  setAdults,
  child,
  setChild,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 md:p-6 w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto">


        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select your stay</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />

          <div className="space-y-4">
            <Counter label="Rooms" value={rooms} setValue={setRooms} />
            <Counter label="Adults" value={adults} setValue={setAdults} />
            <Counter label="Children" value={child} setValue={setChild} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#8B1C1C] text-[#F4C430] rounded font-bold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function Counter({ label, value, setValue }) {
  return (
    <div className="flex justify-between items-center border rounded px-4 py-3">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="w-8 h-8 bg-gray-200 rounded"
        >
          −
        </button>
        <span>{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="w-8 h-8 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
