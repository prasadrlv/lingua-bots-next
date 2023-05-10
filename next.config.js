/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        openAIApiKey: process.env.OPENAI_API_KEY,
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
