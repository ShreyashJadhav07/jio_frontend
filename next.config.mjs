/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  
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
