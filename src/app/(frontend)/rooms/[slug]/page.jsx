import RoomHero from "../../components/Room/RoomHero";
import RoomOptions from "../../components/Room/RoomOptions";
import RoomGallery from "../../components/Gallery/RoomGallery";

export default async function RoomPage({ params }) {
  const { slug } = await params;

  let room = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/rooms`, { cache: 'no-store' });
    const rooms = await res.json();
    room = rooms.find(r => r.slug === slug);
  } catch (error) {
    console.error("Error fetching room:", error);
  }

  if (!room) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Room Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the room you're looking for. It might have been moved or deleted.</p>
          <a href="/" className="inline-block bg-[#153e64] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0d2a45] transition">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const displayRoom = {
    title: room.name || room.title,
    banner: room.image || room.banner,
    plans: room.plans || [
      {
        title: "Standard Plan | Free Cancellation",
        price: "Contact for Pricing",
        features: ["Breakfast included", "Risk Free Booking"],
      }
    ],
    inside: room.inside || [room.image],
    wash: room.wash || [room.image],
  };

  return (
    <>
      <RoomHero image={displayRoom.banner} />
      <RoomOptions title={displayRoom.title} plans={displayRoom.plans} />
      <RoomGallery title="INSIDE ROOM" images={displayRoom.inside} />
      <RoomGallery title="WASH ROOM" images={displayRoom.wash} />
    </>
  );
}
