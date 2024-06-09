/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatar.iran.liara.run'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
