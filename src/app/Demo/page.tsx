import {columns, Payment} from "./columns";
import {DataTable, payments} from "./FileTable";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		// ...
	];
}

export default async function page() {
	const data = await getData();
	return (
		<div className="w-full container mx-auto mt-5">
			<DataTable columns={columns} data={payments} />
		</div>
	);
}
