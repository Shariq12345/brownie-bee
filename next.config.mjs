/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "firebasestorage.googleapis.com"
            },
            {
                hostname: "img.icons8.com"
            }
        ]
    }
};

export default nextConfig;
