import Image from "next/image";

export default function loading() {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<Image
				src="/empty.svg"
				alt="Logo"
				width={300}
				height={300}
				className="animate-pulse duration-700"
			/>
		</div>
	);
}
