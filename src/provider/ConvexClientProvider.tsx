"use client";
import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {ConvexQueryClient} from "@convex-dev/react-query";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ReactNode} from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});
convexQueryClient.connect(queryClient);
export function ConvexClientProvider({children}: {children: ReactNode}) {
	return (
		<ClerkProvider publishableKey={clerkPk}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<QueryClientProvider client={queryClient}>
					<>{children}</>
					{/* <AuthLoading>
						<Loading />
					</AuthLoading> */}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
