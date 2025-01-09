"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "convex/react";
import {formatRelative} from "date-fns";
import Image from "next/image";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import {FileCardAction} from "./FileCardAction";
import {filesTypes} from "./FileList";

function UserCell({userId}: {userId: Id<"users">}) {
	const userProfile = useQuery(api.users.getUserProfile, {userId: userId});
	return (
		<div className="flex gap-2">
			<div className="flex flex-col justify-center ">
				<Avatar className="size-10">
					<AvatarImage src={userProfile?.image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col justify-center">
				<span>{userProfile?.name}</span>
			</div>
		</div>
	);
}

export const columns: ColumnDef<filesTypes>[] = [
	{
		header: "Name",
		cell: ({row}) => {
			return (
				<HoverCard>
					<HoverCardTrigger className="h-full">
						<div className="h-full">{row.original.name}</div>
					</HoverCardTrigger>
					<HoverCardContent className="p-0" side="right" align="center">
						<Image
							width={200}
							height={100}
							alt={row.original.name}
							src={row.original.url || "/default.png"}
							className="object-cover rounded-sm h-full w-full"
						/>
					</HoverCardContent>
				</HoverCard>
			);
		},
	},

	{
		accessorKey: "type",
		header: "Type",
	},
	{
		header: "User",
		cell: ({row}) => {
			return <UserCell userId={row.original.userId} />;
		},
	},
	{
		header: "Uploaded On",
		cell: ({row}) => {
			return <div>{formatRelative(new Date(row.original._creationTime), new Date())}</div>;
		},
	},
	{
		id: "actions",
		cell: ({row}) => {
			return <FileCardAction file={row.original} />;
		},
	},
];
