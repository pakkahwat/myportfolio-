/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every route in this site is prerendered, so emit a plain static bundle
  // into out/ and let the Cloudflare Worker serve it from the ASSETS binding
  // (see wrangler.toml). No SSR runtime, no adapter needed.
  output: 'export',
}

export default nextConfig
