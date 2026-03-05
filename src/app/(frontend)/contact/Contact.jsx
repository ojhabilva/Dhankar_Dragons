"use client";

import Image from "next/image";

export default function Contact() {
    return (
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
                        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight drop-shadow-lg">
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
                                >
                                    xyz@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}