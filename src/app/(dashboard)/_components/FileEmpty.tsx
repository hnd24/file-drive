import Image from "next/image";
import UploadButton from "./UploadButton";

type Props = {
	type?: "files" | "favorites" | "trash";
};

export default function FileEmpty({type = "files"}: Props) {
	return (
		<div>
			<div className="flex flex-col gap-8 justify-center items-center mt-8">
				<Image src="/empty.svg" alt="No files" width={300} height={300} />
				<h1 className="font-semibold text-3xl flex text-center">
					You have no {(type === "favorites" && "favorite") || (type === "trash" && "trash")} files
				</h1>
				{type === "files" && <UploadButton />}
			</div>
		</div>
	);
}
