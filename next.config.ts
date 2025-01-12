import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "warmhearted-mandrill-113.convex.cloud",
			},
			{
				protocol: "https",
				hostname: "tangible-dachshund-14.convex.cloud",
			},
		],
	},
};

export default nextConfig;
