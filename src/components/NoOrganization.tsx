import {CreateOrganization} from "@clerk/nextjs";
import {DialogTitle} from "@radix-ui/react-dialog";
import Image from "next/image";
import {Button} from "./ui/button";
import {Dialog, DialogContent, DialogTrigger} from "./ui/dialog";

export default function NoOrganization() {
	return (
		<div className="flex flex-col gap-8 justify-center items-center mt-28">
			<Image src="/team.svg" alt="No team" width={300} height={300} />
			<p className="font-semibold text-3xl flex text-center">
				Create an organization to get started
			</p>
			<div className="mt-6">
				<Dialog>
					<DialogTrigger asChild>
						<Button size="lg">Create organization</Button>
					</DialogTrigger>
					<DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
						<DialogTitle />.
						<CreateOrganization />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
