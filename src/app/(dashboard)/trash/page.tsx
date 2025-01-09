"use client";

import {Protect} from "@clerk/nextjs";

import DefaultPage from "@/app/(dashboard)/_components/PageDefault";
import NoPermission from "@/components/NoPermission";

export default function TrashPage() {
	return (
		<Protect role="org:admin" fallback={<NoPermission />}>
			<DefaultPage type="trash" />
		</Protect>
	);
}
