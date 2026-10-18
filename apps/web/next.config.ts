import type { NextConfig } from "next";

type RemotePattern = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>[number];

function remotePatternFromPublicUrl(value: string | undefined): RemotePattern | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;

    return {
      hostname: url.hostname,
      pathname: url.pathname,
      port: url.port,
      protocol: "https",
    };
  } catch {
    return undefined;
  }
}

const footerLogoPattern = remotePatternFromPublicUrl(process.env.NEXT_PUBLIC_FOOTER_LOGO_URL);

const nextConfig: NextConfig = {
  ...(footerLogoPattern ? { images: { remotePatterns: [footerLogoPattern] } } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
