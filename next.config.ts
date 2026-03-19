import type { NextConfig } from "next";

const nextConfig:NextConfig= {
  allowedDevOrigins: ['192.168.1.102', '192.168.1.0/24']
}

module.exports = nextConfig


export default nextConfig;
