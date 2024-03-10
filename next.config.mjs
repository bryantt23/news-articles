/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['static01.nyt.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static01.nyt.com',
            },
        ]
    },
};

export default nextConfig;
