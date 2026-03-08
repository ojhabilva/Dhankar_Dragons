
import Link from "next/link";

export default function Connect() {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-end h-full mt-12 ">
        <h2 className="text-2xl font-serif mb-4" title="Connect With Us">
          CONNECT WITH US
        </h2>


        <div className="flex gap-4">

          <Link
            href="https://www.facebook.com/"
            target="_blank"
            aria-label="Facebook"
            className="hover:scale-110 transition"
            title="Follow us on Facebook"
          >
            <img src="/Dhankhar Dragons/icons/facebook-color-svgrepo-com 1.svg" alt="Facebook" className="w-9" />
          </Link>

          <Link
            href="https://www.instagram.com/"
            target="_blank"
            aria-label="Instagram"
            className="hover:scale-110 transition"
            title="Follow us on Instagram"
          >
            <img src="/Dhankhar Dragons/icons/instagram-1-svgrepo-com 1.svg" alt="Instagram" className="w-9" />
          </Link>

          <Link
            href="https://wa.me/910000000000"
            target="_blank"
            aria-label="WhatsApp"
            className="hover:scale-110 transition"
            title="Chat with us on WhatsApp"
          >
            <img src="/Dhankhar Dragons/icons/whatsapp-whats-app-svgrepo-com 1.svg" alt="WhatsApp" className="w-9" />
          </Link>

        </div>
      </div>
    </>
  )
}
