"use client";
import Image from "next/image";
import Link from "next/link";
import ConnectWithUs from "../../components/Connect-us/ConnectWithUS"

export default function SpitiLuxuryPackage() {
  return (
    <section className="bg-white">

      <div className="relative h-[60vh] w-full">
        <Image
          src="/Home page/packages/winter/Firefly (1) 1.png"
          alt="Spiti Luxury"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-start">
          <div className="mt-16 ml-10 bg-white/80 px-6 py-4">
            <h2 className="text-xl font-serif uppercase tracking-wide">
              Diversity of Spiti Valley
            </h2>
            <p className="text-sm mt-1">Winter Spiti</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-serif font-semibold">
          Spiti Valley Luxury Explorer: 6 Nights / 7 Days
        </h2>

        <p className="text-sm text-gray-700 mt-4 max-w-4xl mx-auto">
          Embark on a luxurious 6 Nights and 7 Days journey to the remote
          Spiti Valley. This premium package includes handpicked luxury
          homestays and boutique hotels with breakfast, dinner, bonfire
          experiences, and expert-guided adventures — primarily based in Kaza.
        </p>
      </div>

      <h3 className="text-center text-xl font-serif font-semibold mb-6">
        ITINERARY DETAILS:
        <br />
        <span className="text-base font-normal">
          Spiti Valley Luxury Explorer for 6 Nights / 7 Days
        </span>
      </h3>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 mb-10">
        {[
          "water.png",
          "Ki (Key) Monastery 01 1.png",
          "Key.png",
          "buddha.png",
          "fb41c8d6-e5c3-4be5-992a-1624f6344277 1.png",
          "Chandratal-Lake-Spiti-Valley-750x467 1.png",
        ].map((img, i) => (
          <div key={i} className="relative h-48">
            <Image
              src={`/Home page/packages/winter/${img}`}
              alt="Spiti View"
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

        <div className="text-sm text-gray-800 space-y-5 leading-relaxed">
          <p><strong>Day 1:</strong><br />
            Arrival in Kaza (via Shimla or Manali). Check-in and rest for
            high-altitude acclimatization. Overnight at luxury Spiti homestay, Kaza.
          </p>

          <p><strong>Day 2:</strong><br />
            Visit Kaza Gompa and riverside picnic with gourmet Ladakhi cuisine.
            Evening stargazing session. Overnight at Kaza.
          </p>

          <p><strong>Day 3:</strong><br />
            Key Monastery & Kibber Village tour. Private monk interaction followed
            by Chicham Bridge thrill. Overnight at Kaza.
          </p>

          <p><strong>Day 4:</strong><br />
            High Villages Circuit: Langza (fossils & Buddha statue), Hikkim (World’s
            Highest Post Office), Komic & Tangyud Monastery. Exclusive high-tea.
          </p>

          <p><strong>Day 5:</strong><br />
            Dhankar & Tabo Monasteries. Cliffside ruins and UNESCO murals with
            Indus River picnic lunch. Evening bonfire storytelling.
          </p>

          <p><strong>Day 6:</strong><br />
            Leisure day / local exploration / photography. Farewell dinner.
          </p>
        </div>

        <div className="relative h-[720px]">
          <Image
            src="/Home page/packages/winter/dhankar-village 1.png"
            alt="Dhankar"
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 text-sm text-gray-700">
        <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Valid for Summer Season: 1st June – 30th Sept 2026</li>
          <li>Non-transferable; cannot be combined with other offers</li>
          <li>Travel subject to weather, road, and permit conditions</li>
          <li>Includes oxygen cylinders, bottled water, snacks, expert driver</li>
          <li>Force Majeure clause applicable</li>
        </ul>
      </div>

      <div className="mt-12">
        <Link href="/booking">
          <button className="w-full bg-[#163e63] text-white py-4 text-lg font-semibold hover:bg-[#0f2e4a] transition">
            Book Now
          </button>
        </Link>
      </div>
      <ConnectWithUs />
    </section>
  );
}
