function getSupabaseImageHostname() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl || !URL.canParse(supabaseUrl)) {
    return "";
  }

  return new URL(supabaseUrl).hostname;
}

const supabaseImageHostname = getSupabaseImageHostname();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      ...(supabaseImageHostname
        ? [
            {
              protocol: "https",
              hostname: supabaseImageHostname,
              port: "",
              pathname: "/storage/v1/object/public/product-images/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
