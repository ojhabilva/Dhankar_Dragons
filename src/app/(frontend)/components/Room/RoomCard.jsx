import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ slug, image, title, capacity }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="relative w-full h-[260px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-serif font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {capacity}
        </p>
      </div>
    </div>
  );
}
