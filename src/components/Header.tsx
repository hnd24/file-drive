"use client";

import {OrganizationSwitcher, useOrganization, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import {Card} from "./ui/card";

export default function Header() {
	const {organization} = useOrganization();
	return (
		<div>
			<Card className="container mx-auto border-b py-4 bg-gray-50 shadow-xl lg:px-4">
				<div className=" mx-auto flex justify-between px-6">
					<Link href="/" className="flex flex-col justify-center text-xl font-semibold">
						FileDrive
					</Link>
					<div className="">
						<OrganizationSwitcher />
						<UserButton />
					</div>
				</div>
			</Card>
		</div>
	);
}
