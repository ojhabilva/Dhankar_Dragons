import RoomOptionCard from "./RoomOptionCard";

export default function RoomOptions({ title, plans }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif text-gray-900 mb-6">{title}</h1>

      <div className="space-y-6">
        {plans.map((plan, i) => (
          <RoomOptionCard key={i} {...plan} />
        ))}
      </div>
    </div>
  );
}
