import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The SQLite file is opened at runtime via a dynamic path, so Next's static
  // tracing can't detect it. Explicitly include it in the serverless bundle so
  // it ships to Vercel functions.
  outputFileTracingIncludes: {
    "/**": ["./sqlite.db"],
  },
};

export default nextConfig;
