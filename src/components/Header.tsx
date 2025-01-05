import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";

export default function Header() {
	return (
		<div className="border-b py-4 bg-gray-50 shadow-lg">
			<div className="container mx-auto flex justify-between">
				<div className="">FileDrive</div>
				<div className="">
					<OrganizationSwitcher />
					<UserButton />
				</div>
			</div>
		</div>
	);
}
