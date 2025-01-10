"use client";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Protect} from "@clerk/nextjs";
import {FileIcon, StarIcon, TrashIcon} from "lucide-react";

export default function SideNav({
	selectedTab,
	setSelectedTab,
}: {
	selectedTab: string;
	setSelectedTab: (value: string) => void;
}) {
	return (
		<div>
			<Tabs value={selectedTab} onValueChange={setSelectedTab}>
				<TabsList>
					<TabsTrigger value="/">
						<div className="flex gap-2">
							<FileIcon className="size-5" />
							<span className="flex flex-col justify-center">All files</span>
						</div>
					</TabsTrigger>
					<TabsTrigger value="/favorites">
						<div className="flex gap-2">
							<StarIcon className="size-5" />
							<span className="flex flex-col justify-center">Favorites</span>
						</div>
					</TabsTrigger>
					<Protect role="org:admin">
						<TabsTrigger value="/trash">
							<div className="flex gap-2">
								<TrashIcon className="size-5" />
								<span className="flex flex-col justify-center">Trash</span>
							</div>
						</TabsTrigger>
					</Protect>
				</TabsList>
			</Tabs>
		</div>
	);
}
