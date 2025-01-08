"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useToast} from "@/hooks/use-toast";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {useMutation} from "convex/react";
import {EllipsisVertical, FileTextIcon, GanttChartIcon, ImageIcon, TrashIcon} from "lucide-react";
import Image from "next/image";
import {ReactNode, useState} from "react";
import {api} from "../../convex/_generated/api";
import {Doc} from "../../convex/_generated/dataModel";
import {filesTypes} from "./FileList";
import {Button} from "./ui/button";

import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const FileCardAction = ({file}: {file: filesTypes}) => {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const deleteFile = useMutation(api.file.deleteFile);
	const toast = useToast();
	return (
		<>
			<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your account and remove
							your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						{/* delete file */}
						<AlertDialogAction
							onClick={async () => {
								try {
									await deleteFile({fileId: file._id});
									toast.toast({
										title: "File deleted",
										description: "File has been deleted successfully",
										variant: "success",
									});
								} catch (error) {
									toast.toast({
										title: "Error",
										description: "Failed to delete file",
										variant: "destructive",
									});
								}
							}}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<EllipsisVertical className="hover:text-gray-400 cursor-pointer size-5" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						className=" text-red-600 cursor-pointer"
						onClick={() => setIsConfirmOpen(true)}>
						Delete
						<DropdownMenuShortcut>
							<TrashIcon className="size-4 relative -top-0.5" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export const typesIcon = {
	"image": <ImageIcon />,
	"pdf": <FileTextIcon />,
	"csv": <GanttChartIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

export function FileCard(file: filesTypes) {
	console.log("file", file.url);
	return (
		<Card>
			<CardHeader className="relative">
				<div className=" absolute top-2 right-2">
					<FileCardAction file={file} />
				</div>
				<CardTitle className="flex gap-2">
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
			</CardHeader>
			<CardContent>
				<div className="w-full h-50% flex ">
					{file.type === "image" && (
						<AspectRatio ratio={16 / 9}>
							<HoverCard>
								<HoverCardTrigger>
									<Image
										width={200}
										height={100}
										alt={file.name}
										src={file.url || "/default.png"}
										className="object-cover rounded-sm h-full w-full"
									/>
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
					{file.type === "pdf" && (
						<AspectRatio ratio={16 / 9} className="flex items-center justify-center">
							<Image
								width={100}
								height={50}
								alt={file.name}
								src={"PDF.svg"}
								className="object-cover rounded-sm h-full w-full"
							/>
						</AspectRatio>
					)}
					{file.type === "csv" && (
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
			<CardFooter>
				<Button
					className="mx-auto"
					onClick={() => {
						window.open(file.url || "https://www.google.com.vn/", "_blank");
					}}>
					Download
				</Button>
			</CardFooter>
		</Card>
	);
}
