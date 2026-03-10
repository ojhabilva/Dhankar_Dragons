"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Message sent! We'll get back to you soon.");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />

            <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden flex items-center mt-16 md:mt-24">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/contact_bg.png"
                        alt="Contact person"
                        fill
                        className="object-cover object-right md:object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#b58145] via-[#b58145]/90 to-[#b58145]/10" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
                    <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight drop-shadow-lg" title="Get In Touch">
                                Get In Touch
                            </h1>
                            <p className="text-lg md:text-xl opacity-95 font-medium leading-relaxed drop-shadow-sm max-w-md">
                                Want to get in touch? We would love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-5 group cursor-pointer transition-all">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#ff1493]/30 transition-all border border-white/30 shadow-lg">
                                    <svg className="w-7 h-7 text-[#ff1493] filter drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <a
                                        href="tel:+910000000000"
                                        className="text-2xl md:text-3xl font-bold hover:text-[#ff1493] transition-all tracking-tighter"
                                        title="Call us at +91 00000 00000"
                                    >
                                        +91 00000 00000
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 group cursor-pointer transition-all">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#a8a8ff]/30 transition-all border border-white/30 shadow-lg">
                                    <svg className="w-7 h-7 text-[#a8a8ff] filter drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <a
                                        href="mailto:xyz@gmail.com"
                                        className="text-2xl md:text-3xl font-bold hover:text-[#a8a8ff] transition-all tracking-tighter"
                                        title="Email us at xyz@gmail.com"
                                    >
                                        xyz@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-2" title="Send Us a Message">Send Us a Message</h2>
                    <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#b58145] focus:border-transparent transition text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#b58145] focus:border-transparent transition text-gray-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 00000 00000"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#b58145] focus:border-transparent transition text-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message <span className="text-red-500">*</span></label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-[#b58145] focus:border-transparent transition text-gray-800 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#b58145] text-white font-bold py-4 rounded-xl hover:bg-[#a06e35] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 text-lg"
                        >
                            {submitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
