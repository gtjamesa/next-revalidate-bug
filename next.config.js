/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Disable ISR cache to ensure that no requests are stored in memory
        isrMemoryCacheSize: 0,
    }
}

module.exports = nextConfig
