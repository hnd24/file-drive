"use client";

import FileEmpty from "@/app/(dashboard)/_components/FileEmpty";
import FileList from "@/app/(dashboard)/_components/FileList";
import {Loading} from "@/app/(dashboard)/_components/Loading";
import SearchBar from "@/app/(dashboard)/_components/SearchBar";
import UploadButton from "@/app/(dashboard)/_components/UploadButton";
import Error from "@/app/error";
import NoOrganization from "@/components/NoOrganization";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Toggle} from "@/components/ui/toggle";
import {useOrganization} from "@clerk/nextjs";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {Grid2x2Check} from "lucide-react";
import {useState} from "react";
import {api} from "../../../../convex/_generated/api";
import {DataTable} from "./FileTable";
import {columns} from "./columns";
type Props = {
	type?: "files" | "favorites" | "trash";
};

export default function DefaultPage({type = "files"}: Props) {
	const [isGird, setIsGird] = useState(false);
	const [typeFile, setTypeFile] = useState<"file" | "image" | "all">("all");

	const {organization} = useOrganization();
	const [query, setQuery] = useState("");

	const orgId = organization?.id;
	const queryOptions = orgId
		? {
				orgId,
				query,
				favorites: type === "favorites",
				deletedOnly: type === "trash",
				type: typeFile === "all" ? undefined : typeFile,
			}
		: "skip";

	const {data: files, isPending, error} = useQuery(convexQuery(api.file.getFiles, queryOptions));
	if (error) return <Error error={error} />;
	return (
		<div className="w-full">
			{!organization ? (
				<NoOrganization />
			) : (
				<div className="flex flex-col items-center  pt-4 container gap-4 mx-auto lg:px-4">
					<div className="flex justify-between items-center w-full md:px-0">
						<div className="text-2xl font-bold cursor-pointer" onClick={() => setQuery("")}>
							Your files
						</div>
						{type === "files" && files && files.length > 0 && <UploadButton />}
					</div>
					<div className="flex items-center w-full gap-2">
						<Toggle onPressedChange={setIsGird} pressed={isGird}>
							<Grid2x2Check />
						</Toggle>
						<SearchBar className="w-full px-3 md:px-0" setQuery={setQuery} />
					</div>
					{files && files.length === 0 && <FileEmpty type={type} />}
					{isPending && <Loading className={"mt-40"} content="Loading your file ...!" />}
					<div className="flex justify-end w-full">
						{files && files.length > 0 && (
							<Select
								value={typeFile}
								onValueChange={value => setTypeFile(value as "file" | "image" | "all")}>
								<SelectTrigger className="w-fit min-w-28">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="file">FILES</SelectItem>
									<SelectItem value="image">IMAGES</SelectItem>
								</SelectContent>
							</Select>
						)}
					</div>
					{files && !isGird && <FileList files={files} />}
					<div className="w-full">
						{files && files.length > 0 && isGird && <DataTable columns={columns} data={files} />}
					</div>
				</div>
			)}
		</div>
	);
}
