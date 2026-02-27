import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingBar from "./components/BookingBar/BookingBar"; // fixed bottom bar

export default function FrontendLayout({ children }) {
  return (
    <>
      <Header />

      {/* PAGE CONTENT */}
      <main className="pb-28">
        {children}
      </main>

      <Footer />

      {/* FIXED BOTTOM BOOKING BAR */}
      <BookingBar />
    </>
  );
}
