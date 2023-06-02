/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/my-blogs",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
