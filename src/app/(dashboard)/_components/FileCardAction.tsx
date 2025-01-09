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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useToast} from "@/hooks/use-toast";
import {useMutation, useQuery} from "convex/react";
import {DownloadIcon, EllipsisVertical, StarIcon, StarOff, TrashIcon, Undo2} from "lucide-react";
import {useState} from "react";
import {api} from "../../../../convex/_generated/api";
import {filesTypes} from "./FileList";

import {Protect} from "@clerk/nextjs";

export const FileCardAction = ({file}: {file: filesTypes}) => {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const deleteFile = useMutation(api.file.deleteFile);

	const toggleFavorite = useMutation(api.file.toggleFavorite);
	const me = useQuery(api.users.getMe);
	const restoreFile = useMutation(api.file.restoreFile);
	const toast = useToast();

	return (
		<>
			<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>This will move the file to the trash.</AlertDialogDescription>
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
						onClick={() => {
							toggleFavorite({fileId: file._id});
						}}>
						{file?.favorite ? "Unfavorite" : "Favorite"}
						<DropdownMenuShortcut>
							{file?.favorite ? (
								<StarOff className="size-4 relative -top-0.5" />
							) : (
								<StarIcon className="size-4 relative -top-0.5" />
							)}
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							window.open(file.url || "https://www.google.com.vn/", "_blank");
						}}>
						Download
						<DropdownMenuShortcut>
							<DownloadIcon className="size-4 relative -top-0.5" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<Protect
						condition={has => {
							return has({role: "admin"}) || file.userId === me?._id;
						}}>
						<DropdownMenuSeparator />
						<>
							{file?.shouldDelete ? (
								<DropdownMenuItem
									className=" text-green-600 cursor-pointer"
									onClick={() => {
										restoreFile({fileId: file._id});
									}}>
									Restore
									<DropdownMenuShortcut>
										<Undo2 className="size-4 relative -top-0.5" />
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									className=" text-red-600 cursor-pointer"
									onClick={() => setIsConfirmOpen(true)}>
									Delete
									<DropdownMenuShortcut>
										<TrashIcon className="size-4 relative -top-0.5" />
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							)}
						</>
					</Protect>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
