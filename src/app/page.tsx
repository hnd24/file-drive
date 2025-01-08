"use client";

import {Button} from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";
import {SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization} from "@clerk/nextjs";
import {useQuery} from "convex/react";

import FileList from "@/components/FileList";
import {Loading} from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import {useState} from "react";
import {api} from "../../convex/_generated/api";

export default function Home() {
	const {organization} = useOrganization();
	const [query, setQuery] = useState("");

	const orgId = organization?.id;
	const files = useQuery(api.file.getFiles, orgId ? {orgId, query} : "skip");
	const isLoading = files === undefined;
	return (
		<main className="flex flex-col items-center pt-6 container gap-6 mx-auto lg:px-4">
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
			<div className="flex justify-between items-center w-full px-3 md:px-0">
				<div className="text-2xl font-bold" onClick={() => setQuery("")}>
					Your files
				</div>
				{files && files.length > 0 && <UploadButton />}
			</div>
			<SearchBar className="w-full px-3 md:px-0" setQuery={setQuery} />
			{isLoading && <Loading className={"mt-40"} content="Loading your file ...!" />}
			{files && <FileList files={files} />}
		</main>
	);
}
