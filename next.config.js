/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three']);

const nextConfig = {
	reactStrictMode: true,
	withTM,
};

module.exports = nextConfig;
