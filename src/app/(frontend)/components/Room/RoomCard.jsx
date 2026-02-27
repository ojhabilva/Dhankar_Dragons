import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ slug, image, title, capacity }) {
  return (
    <div className="min-w-[340px] md:min-w-[480px] bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Image */}
      <div className="relative w-full h-[260px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between p-5">
        {/* Left content */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {capacity}
          </p>
        </div>

        {/* Right button */}
        <Link href={`/rooms/${slug}`}>
          <button className="bg-[#8B1C1C] hover:bg-[#6f1515] text-white px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap">
            BOOK NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
