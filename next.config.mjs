/** @type {import('next').NextConfig} */
const nextConfig = {
  
    trailingSlash: true,
    images:{
        remotePatterns: [
            {
                hostname: "image.tmdb.org"
            },
            {
                hostname: "localhost",
            }
        ]
    }
};

export default nextConfig;