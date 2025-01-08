"use client";

import Image from "next/image";
import {Doc} from "../../convex/_generated/dataModel";
import {FileCard} from "./FileCard";
import UploadButton from "./UploadButton";

export type filesTypes = Doc<"files"> & {
	url?: string | null;
};

export default function FileList({files}: {files: filesTypes[]}) {
	return (
		<>
			{files && files.length === 0 && (
				<div className="flex flex-col gap-8 justify-center items-center mt-24">
					<Image src="/empty.svg" alt="No files" width={300} height={300} />
					<h1 className="font-semibold text-3xl flex text-center">You have no files, upload now</h1>
					<UploadButton />
				</div>
			)}

			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{files?.map(file => {
					return <FileCard key={file._id} {...file} />;
				})}
			</div>
		</>
	);
}
