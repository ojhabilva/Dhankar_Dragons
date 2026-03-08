
import "./globals.css";

export const metadata = {
  title: "Dhankar Dragons",
  description: "Experience the magic of Ladakh with Dhankar Dragons - Premium Stays and Adventures.",
  icons: {
    icon: "/Dhankhar Dragons/dhankhar dragons.png",
  },
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
