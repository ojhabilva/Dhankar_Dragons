"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !review) {
      alert("Please add rating and review");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Guest",
        rating,
        text: review,
        image: image || "",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Review submitted successfully");
      setRating(0);
      setReview("");
      setImage(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-10">
      
      {/* HEADER */}
      <h2 className="text-gray-500 tracking-widest text-sm mb-6">
        WRITE A REVIEW
      </h2>

      {/* TOP ROW */}
      <div className="flex justify-between items-start mb-8">
        
        {/* STAR RATING */}
        <div>
          <p className="text-gray-500 mb-2">Score:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* IMAGE UPLOAD BOX */}
        <label className="border-2 border-blue-400 rounded-md w-32 h-28 flex flex-col items-center justify-center cursor-pointer text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h18M3 19h18M4 7h16v10H4z"
            />
          </svg>
          <span className="text-sm">Upload</span>
          <input
            type="file"
            hidden
            onChange={(e) => setImage(e.target.files[0]?.name)}
          />
        </label>
      </div>

      {/* REVIEW */}
      <label className="block mb-2 font-medium text-lg">
        Review:
      </label>
      <textarea
        className="w-full border rounded-md p-4 mb-10 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Excellent Service!!"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* ACTION BUTTONS */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            setRating(0);
            setReview("");
          }}
          className="px-10 py-3 border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-12 py-3 bg-[#163b5c] text-white rounded-md hover:bg-[#0f2c46]"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
