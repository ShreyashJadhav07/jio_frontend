/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Add this line
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
