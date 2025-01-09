"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useQuery} from "convex/react";
import {FileTextIcon, ImageIcon} from "lucide-react";
import Image from "next/image";
import {ReactNode, Suspense} from "react";
import {api} from "../../../../convex/_generated/api";
import {Doc} from "../../../../convex/_generated/dataModel";
import {filesTypes} from "./FileList";

import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {FileCardAction} from "./FileCardAction";
import ImageFallback from "./ImageFallback";
import ProfileUser from "./ProfileUser";

export const typesIcon = {
	"image": <ImageIcon className="size-4" />,
	"file": <FileTextIcon className="size-4" />,
} as Record<Doc<"files">["type"], ReactNode>;

export function FileCard(file: filesTypes) {
	const userProfile = useQuery(api.users.getUserProfile, {userId: file.userId});
	return (
		<Card>
			<CardHeader className="relative px-2 pb-0">
				<div className="mb-2">
					<div className="absolute top-0.5 left-2">
						<ProfileUser
							name={userProfile?.name || "CN"}
							imageURL={userProfile?.image || "https://github.com/shadcn.png"}
							timeCreate={file._creationTime}
						/>
					</div>
					<div className=" absolute top-2 right-2">
						<FileCardAction file={file} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2">
				<div className="w-full h-50% flex ">
					{file.type === "image" && (
						<AspectRatio ratio={16 / 9}>
							<HoverCard>
								<HoverCardTrigger>
									<Suspense
										fallback={
											<div className="flex items-center justify-center w-full h-full">
												<ImageFallback />
											</div>
										}>
										<Image
											width={200}
											height={100}
											alt={file.name}
											src={file.url || "/default.png"}
											className="object-cover rounded-sm h-full w-full"
										/>
									</Suspense>
								</HoverCardTrigger>
								<HoverCardContent className="p-0" side="right" align="center">
									<Image
										width={200}
										height={100}
										alt={file.name}
										src={file.url || "/default.png"}
										className="object-cover rounded-sm h-full w-full"
									/>
								</HoverCardContent>
							</HoverCard>
						</AspectRatio>
					)}

					{file.type === "file" && (
						<AspectRatio ratio={16 / 9} className="flex items-center justify-center">
							<Image
								width={200}
								height={100}
								alt={file.name}
								src={"CSV.svg"}
								className="object-cover rounded-sm h-full w-full"
							/>
						</AspectRatio>
					)}
				</div>
			</CardContent>
			<CardFooter className="pt-0 pb-2 px-2 flex justify-between items-center">
				<CardTitle className="flex gap-1 font-normal">
					<div className=" relative">{typesIcon[file.type]}</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="flex flex-col justify-center truncate w-full">
								{file.name}
							</TooltipTrigger>
							<TooltipContent>
								<p>{file.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</CardTitle>
			</CardFooter>
		</Card>
	);
}
