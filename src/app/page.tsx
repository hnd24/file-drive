"use client";

import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/nextjs";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";

export default function Home() {
	const files = useQuery(api.file.getFile);
	const createFile = useMutation(api.file.createFile);

	return (
		<main className="flex min-h-screen flex-col items-center justify-around">
			<SignedIn>
				<SignOutButton>
					<Button>Log out</Button>
				</SignOutButton>
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Log in</Button>
				</SignInButton>
			</SignedOut>
			<Button
				onClick={async () => {
					await createFile({name: "test"});
				}}>
				Create file
			</Button>
			{files?.map(file => <div key={file.id}>{file.name}</div>)}
		</main>
	);
}
