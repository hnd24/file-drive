import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tangible-dachshund-14.convex.cloud",
			},
		],
	},
};

export default nextConfig;
