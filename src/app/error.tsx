"use client";

import {useEffect} from "react";

export default function Error({error}: {error: Error & {digest?: string}}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex h-full flex-col items-center justify-center mt-28">
			<h2 className="text-center">Something went wrong!</h2>
			<button
				className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
				onClick={() => {
					window.location.reload();
				}}>
				Try again
			</button>
		</main>
	);
}
