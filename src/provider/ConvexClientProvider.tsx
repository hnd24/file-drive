"use client";

import {ClerkProvider, useAuth} from "@clerk/nextjs";
import {Authenticated, AuthLoading, ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ReactNode} from "react";
import Loading from "../app/loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;
export function ConvexClientProvider({children}: {children: ReactNode}) {
	return (
		<ClerkProvider publishableKey={clerkPk}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Authenticated>{children}</Authenticated>
				<AuthLoading>
					<Loading />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
