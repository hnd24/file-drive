import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="mt-32 w-full flex flex-col justify-center items-center gap-4">
			<Image src="/notFound.svg" alt="Logo" width={300} height={300} />
			<Link href="/files">
				<Button className="font-semibold">Dashboard page</Button>
			</Link>
		</div>
	);
}
