import Image from "next/image";
import TestimonialForm from "../components/TestimonialForm/TestimonialForm"


export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden">

      <section className="relative h-[50vh] md:h-[85vh] w-full">
        <Image
          src="/Home page/Hero image/Home.jpg"
          alt="Hotel View"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center pb-8 md:pb-8">
          <p className="uppercase tracking-widest text-sm mb-3">ABOUT</p>

          <Image
            src="/Home page/dhankhar dragons.png"
            alt="Dhankhar Dragons"
            width={420}
            height={120}
            className="object-contain"
          />
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <p className="text-gray-700 leading-relaxed text-lg font-serif">
          Nestled in the serene landscape of Spiti Valley, Himachal Pradesh, our
          hotel offers a comfortable and welcoming stay amidst the raw beauty
          of the high Himalayas. Surrounded by rugged mountains and open skies,
          the property is designed to blend traditional Spitian architecture
          with modern comforts.
          <br /><br />
          Our well-appointed rooms provide warmth, simplicity, and beautiful
          valley or mountain views, ensuring a restful experience after a day
          of exploration. Rooted in local culture and guided by time-honoured
          hospitality, we offer a peaceful retreat where guests can experience
          Spiti’s quiet charm without compromising on comfort.
        </p>

        <Image
          src="/Home page/about/Rectangle 53.png"
          alt="Guests"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover"
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <Image
          src="/Home page/about/Firefly_A cinematic travel photograph of a solo female traveler sitting on the edge of a rock 524921 1.png"
          alt="Mission"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover"
        />

        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6" title="Our Mission">OUR MISSION</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be a home for travelers from around the world seeking
            authenticity, comfort, and a sense of belonging. We are committed
            to providing an unforgettable experience that captures the essence
            of the Himalayas.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2">

        <div className="bg-[#a6763b] text-white px-6 md:px-10 py-10 md:py-16 flex flex-col justify-center">
          <h3 className="text-3xl font-semibold mb-4" title="Get In Touch">Get In Touch</h3>
          <p className="mb-8">
            Want to get in touch? We would love to hear from you.
          </p>

          <div className="space-y-4 text-xl">
            <p>📞 +91 00000 00000</p>
            <p>✉️ xyz@gmail.com</p>
          </div>
        </div>

        <div className="relative w-full h-64 md:h-full min-h-[250px]">
          <Image
            src="/Home page/about/Firefly_A Ladakhi woman hotel receptionist receiving a phone call at the reception desk, wear 661804 1.png"
            alt="Reception"
            width={900}
            height={600}
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#a6763b]/40 to-[#a6763b]" />
        </div>

      </section>
      <TestimonialForm />


    </main>
  );
}
