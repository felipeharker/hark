import type { NextConfig } from "next";

/**
 * A static export, served under /birds/ on felipeharker.org: the repository's
 * build (tools/build.mjs) copies out/ to dist/birds/. basePath makes every
 * <Link>, asset and route start with /birds; a plain <a href="/…"> does not,
 * which is how the site links reach the rest of felipeharker.org.
 */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/birds',
};

export default nextConfig;
