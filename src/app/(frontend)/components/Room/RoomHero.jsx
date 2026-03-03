import Image from "next/image";

export default function RoomHero({ image }) {
  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px]">
      <Image
        src={image}
        fill
        priority
        className="object-cover"
        alt="Room"
      />
    </div>
  );
}
