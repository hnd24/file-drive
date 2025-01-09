import Image from "next/image";
import Link from "next/link";
import {Button} from "./ui/button";

export default function NoPermission() {
	return (
		<div className="flex flex-col gap-8 justify-center items-center mt-28">
			<Image src="/team.svg" alt="No team" width={300} height={300} />
			<p className="font-semibold text-3xl flex text-center">No permission to view this page</p>
			<div className="mt-6">
				<Link href="/files">
					<Button size="lg">Files Page</Button>
				</Link>
			</div>
		</div>
	);
}
