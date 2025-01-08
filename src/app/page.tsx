"use client";

import {Button} from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";
import {SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization} from "@clerk/nextjs";
import {useQuery} from "convex/react";

import FileList from "@/components/FileList";
import {Loading} from "@/components/Loading";
import {api} from "../../convex/_generated/api";

export default function Home() {
	const {organization} = useOrganization();
	const orgId = organization?.id;
	const files = useQuery(api.file.getFiles, orgId ? {orgId} : "skip");
	const isLoading = files === undefined;
	return (
		<main className="flex flex-col items-center pt-12 container gap-6 mx-auto lg:px-4">
			<div className=" hidden">
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
			</div>
			{isLoading && <Loading className={"mt-40"} content="Loading your file ...!" />}
			{!isLoading && files.length > 0 && (
				<div className="flex justify-between items-center w-full">
					<h1 className="text-4xl font-bold">Your File</h1>
					<UploadButton />
				</div>
			)}
			{files && <FileList files={files} />}
		</main>
	);
}
