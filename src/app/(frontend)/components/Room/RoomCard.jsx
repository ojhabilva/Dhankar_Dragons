import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ slug, image, title, capacity }) {
  return (
    <Link href={`/rooms/${slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group-hover:-translate-y-1">

        <div className="relative w-full h-[260px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 group-hover:text-[#8B1C1C] transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {capacity}
          </p>
        </div>
      </div>
    </Link>
  );
}
