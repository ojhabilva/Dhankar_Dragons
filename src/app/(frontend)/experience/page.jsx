"use client";

import Image from "next/image";
import Link from "next/link";
import ConnectWithUS from "../components/Connect-us/ConnectWithUS";

const SectionHeader = ({ title }) => (
    <div className="bg-[#2f4f5f] text-white text-center py-3 my-8">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide" title={title}>
            {title}
        </h2>
    </div>
);

const ExperienceCard = ({ img, title, desc }) => (
    <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="overflow-hidden rounded-md">
            <Image
                src={img}
                alt={title}
                width={1400}
                height={700}
                className="w-full h-auto object-cover"
            />
        </div>
        <h3 className="text-[#c27a2c] font-semibold mt-4 text-lg" title={title}>
            {title}
        </h3>
        <p className="text-gray-700 text-sm mt-1">{desc}</p>
    </div>
);

export default function ExperienceSection() {
    return (
        <section className="bg-white">

            <div className="relative w-full h-[45vh] md:h-[70vh]">
                <Image
                    src="/Dhankhar Dragons/experience/Firefly (1) 1.png"
                    alt="Spiti Valley"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center">
                    <div className="px-8 md:px-16 text-white max-w-xl">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight" title="Experience Spiti Valley">
                            EXPERIENCE SPITI VALLEY <br />
                            <span className="text-lg md:text-xl font-light">
                                DISCOVER BEYOND THE ROADS
                            </span>
                        </h1>

                        <p className="mt-4 text-sm md:text-base">
                            Spiti Valley calls travelers to its high mountain passes,
                            ancient monasteries, pristine lakes, and rugged deserts —
                            a journey into the soul of the Himalayas itself.
                        </p>
                    </div>
                </div>
            </div>
            <SectionHeader title="Scenic Hotspots & Nature’s Wonders" />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/istockphoto-1319416974-612x612 1.png"
                title="Chandra Taal Lake"
                desc="A crescent moon-shaped lake at high altitude, glowing with surreal reflections of snow peaks — a postcard from reality."
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 1.png"
                title="Kunzum Pass"
                desc="A thrilling high pass that connects Lahaul with Spiti, offering panoramic views of raw mountain beauty."
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 3.png"
                title="Dhankar Fortress & Lake"
                desc="Historical citadel perched above a lakefed river gorge, telling tales from centuries past."
            />

            <SectionHeader title="Cultural & Heritage Experiences" />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 2.png"
                title="Key Monastery Exploration"
                desc="Walk through one of Spiti’s oldest monasteries — witness timeless frescoes, age-old scriptures, and chanting rituals."
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 4.png"
                title="Kibber & Tabo Village Tours"
                desc="Experience life in ancient Himalayan settlements where traditions thrive amidst stark landscapes."
            />

            <SectionHeader title="Adventure Trails & Outdoor Activities" />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 5.png"
                title="Trek to Chandratal Camps"
                desc="Guided high-altitude treks to serene campsites by the lake — perfect for sunrise views and starry nights."
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 6.png"
                title="Off-Road Drives"
                desc="Experience exhilarating drives over rocky trails and mountain flats, with each turn revealing a new vista."
            />

            <SectionHeader title="Immersive Experiences" />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 7.png"
                title="Stargazing Nights"
                desc="Under endless skies, watch constellations emerge as Spiti’s silence deepens — an astral retreat above the world."
            />
            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 8.png"
                title="Riverside Bonfire"
                desc="Warm your soul by bonfire on the riverbank with traditional folk stories and local flavors"
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 9.png"
                title="Village Walks & Local Crafts"
                desc="Meet Spitian artisans — witness wool weaving, traditional embroidery, and age-old craft styles."
            />

            <SectionHeader title="Culinary & Evening Delights" />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 10.png"
                title="Spitian Feast"
                desc="Savour local dishes like thukpa and yak-meat stews, paired with aromatic herbal chai — a flavour of mountain heritage."
            />

            <ExperienceCard
                img="/Dhankhar Dragons/experience/photo-1581791534721-e599df4417f7 11.png"
                title="Sunset Viewpoints"
                desc="Settle on a ridge with a warm drink, as the sun paints the snow-peaks in gold and crimson."
            />

            <div className="bg-[#8b6a1e] text-white text-center py-8 md:py-10 mt-10 md:mt-16 px-4">
                <p className="max-w-3xl mx-auto mb-6 text-sm md:text-base">
                    Contact us for day tours, multi-day itineraries, and customized
                    experiences across Spiti Valley.
                </p>
                <Link href="/booking" title="Book an experience now">
                    <button className="bg-[#153e64] hover:bg-[#0f2e4a] px-8 py-3 rounded-md text-lg font-semibold transition" title="Book Now">
                        Book Now
                    </button>
                </Link>
            </div>
            <ConnectWithUS />
        </section>
    );
}
