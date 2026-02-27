import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#915609] text-white mb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo Section (Clickable & Vertical) */}
          <div>
            <Link
              href="/"
              className="flex flex-col items-start gap-3 group"
            >
              {/* Logo Image */}
              <Image
                src="/Home page/logo 1@2x.png"
                alt="Dhankar Dragons Logo"
                width={240}
                height={180}
                className="object-contain group-hover:scale-105 transition"
              />

              {/* Logo Text */}
              <div>
                <Image
                  src="/Home page/dhankhar dragons.png"
                  alt="Dhankar Dragons"
                  width={220}
                  height={60}
                  className="mb-1"
                />
                <p className="text-sm opacity-80">
                  Hotels and Restaurants
                </p>
              </div>
            </Link>
          </div>

          {/* Booking */}
          <div>
            <h4 className="font-semibold text-lg mb-4">BOOKING</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/regular" className="hover:underline">
                  Regular Room
                </Link>
              </li>
              <li>
                <Link href="/deluxe" className="hover:underline">
                  Deluxe Room
                </Link>
              </li>
              <li>
                <Link href="/super-deluxe" className="hover:underline">
                  Super Deluxe Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Terms & Condition
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cancellation-policy" className="hover:underline">
                  Cancellation & Refund Policies
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">CONTACT US</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+910000000000" className="hover:underline">
                  +91 0000 000 000
                </a>
              </li>
              <li>
                <a href="mailto:xyz@gmail.com" className="hover:underline">
                  xyz@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" text-center text-sm ">
        © ALL Rights Reserved Dhankar Dragons 2026.
      </div>
    </footer>
  );
}
