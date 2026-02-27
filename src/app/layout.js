
import "./globals.css";

export const metadata = {
  title: "Home Page",
  description: "Home page - description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
 