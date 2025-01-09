import {SignIn, SignUp} from "@clerk/nextjs";
// import {Link} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "./ui/button";

export default function PageAuthen({type = "sign-in"}: {type: "sign-in" | "sign-up"}) {
	return (
		<div className="h-screen w-full flex justify-center items-center ">
			<div className="flex flex-col md:flex-row justify-center items-center w-full gap-5">
				<div className=" w-full h-full gap-3 flex-col justify-center items-center flex ">
					<Image
						alt=""
						src="/welcome.svg"
						objectFit="cover"
						className="md:w-[50%] w-40"
						width={400}
						height={200}
					/>
					<p className="font-semibold text-2xl text-meowblack text-center">
						The easiest way to upload and share files
					</p>
					<Link href={type == "sign-in" ? "/sign-up" : "/sign-in"} className=" ">
						<Button variant="outline" className="font-semibold text-xl shadow-md">
							{type == "sign-in" ? "sign-up" : "sign-in"}
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-center w-full h-full">
					{type === "sign-in" ? <SignIn /> : <SignUp />}
				</div>
			</div>
		</div>
	);
}
