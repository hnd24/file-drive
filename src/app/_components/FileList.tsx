"use client";

import {Doc} from "../../../convex/_generated/dataModel";
import {FileCard} from "./FileCard";

export type filesTypes = Doc<"files"> & {
	url?: string | null;
};

export default function FileList({files}: {files: filesTypes[]}) {
	return (
		<>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{files?.map(file => {
					return <FileCard key={file._id} {...file} />;
				})}
			</div>
		</>
	);
}
