"use client";

import { useState } from "react";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !rating || !review) {
      alert("Please fill in your name, rating, and review");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        rating,
        text: review,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSubmitted(true);
      setName("");
      setRating(0);
      setReview("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-4xl mt-12 md:mt-24 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-5 md:p-10 mx-4 lg:mx-auto">

      <h2 className="text-gray-500 tracking-widest text-sm mb-6">
        WRITE A REVIEW
      </h2>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
          ✅ Your review has been submitted for approval! It will appear on the website once approved by the admin.
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 font-medium text-lg">Your Name:</label>
        <input
          type="text"
          className="w-full border rounded-md p-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-gray-500 mb-2">Score:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="block mb-2 font-medium text-lg">
        Review:
      </label>
      <textarea
        className="w-full border rounded-md p-4 mb-10 h-40 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Excellent Service!!"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={() => {
            setName("");
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
