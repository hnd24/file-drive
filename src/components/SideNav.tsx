"use client";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FileIcon, StarIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SideNav() {
	const pathName = usePathname();
	return (
		<div>
			<Tabs defaultValue={pathName}>
				<TabsList>
					<TabsTrigger value="/files">
						<Link href={"/files"} className="flex gap-2">
							<FileIcon className="size-5" />
							<span className="flex flex-col justify-center">All files</span>
						</Link>
					</TabsTrigger>
					<TabsTrigger value="/favorites">
						<Link href={"/favorites"} className="flex gap-2">
							<StarIcon className="size-5" />
							<span className="flex flex-col justify-center">Favorites</span>
						</Link>
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
