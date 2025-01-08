import Image from "next/image";
import UploadButton from "./UploadButton";

export default function FileEmpty({favorites = false}: {favorites?: boolean}) {
	return (
		<div>
			<div className="flex flex-col gap-8 justify-center items-center mt-8">
				<Image src="/empty.svg" alt="No files" width={300} height={300} />
				<h1 className="font-semibold text-3xl flex text-center">
					You have no {favorites && "favorite"} files
				</h1>
				{!favorites && <UploadButton />}
			</div>
		</div>
	);
}
