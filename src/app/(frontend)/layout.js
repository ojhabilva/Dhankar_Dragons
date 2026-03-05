import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingBar from "./components/BookingBar/BookingBar";

export default function FrontendLayout({ children }) {
  return (
    <>
      <Header />

      <main className="pb-28">
        {children}
      </main>

      <Footer />

      <BookingBar />
    </>
  );
}
