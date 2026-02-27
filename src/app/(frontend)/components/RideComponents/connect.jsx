import Image from "next/image";
import ConnectWithUS from "../Connect-us/ConnectWithUS";

export default function ConnectSection() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      
      <div
        className="grid md:grid-cols-2 gap-10 
                   border border-gray-200 rounded-2xl 
                   shadow-md p-8 bg-white 
                   items-center"
      >
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/Home page/animal.png"
            alt="Dragon"
            width={320}
            height={320}
            className="object-contain"
          />
        </div>

        {/* RIGHT CONTENT – CENTERED */}
        <div className="flex justify-center items-center text-center h-full">
          <ConnectWithUS />
        </div>
      </div>
    </section>
  );
}
