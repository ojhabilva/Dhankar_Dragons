/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin/packages',
        destination: '/api/admin/addpackage',
        permanent: true,
      },
      {
        source: '/admin/:path*',
        destination: '/api/admin/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/admin/addpackage',
        destination: '/admin/packages',
      },
      {
        source: '/api/admin/:path((?!login).*)*', // Avoid conflict with actual /api/admin/login API if needed, but login is POST anyway
        destination: '/admin/:path*',
      },
      {
        source: '/api/admin/login',
        destination: '/admin/login',
      }
    ];
  },
};

export default nextConfig;
