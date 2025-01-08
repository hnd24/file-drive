import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";

export default function Header() {
	return (
		<div className="container mx-auto border-b py-4 bg-gray-50 shadow-lg">
			<div className=" mx-auto flex justify-between p-3">
				<div className="">FileDrive</div>
				<div className="">
					<OrganizationSwitcher />
					<UserButton />
				</div>
			</div>
		</div>
	);
}
