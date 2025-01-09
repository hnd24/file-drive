import {Skeleton} from "@/components/ui/skeleton";

export default function ImageFallback() {
	return (
		<div className="space-y-2 flex flex-col items-center">
			<div className="flex space-x-2">
				<Skeleton className="w-6 h-6 rounded-full" />
				<Skeleton className="w-12 h-6 rounded-full" />
				<Skeleton className="w-6 h-6 rounded-full" />
			</div>
			<div className="flex space-x-2">
				<Skeleton className="w-12 h-6 rounded-full" />
				<Skeleton className="w-6 h-6 rounded-full" />
				<Skeleton className="w-12 h-6 rounded-full" />
			</div>
			<div className="flex space-x-2">
				<Skeleton className="w-6 h-6 rounded-full" />
				<Skeleton className="w-12 h-6 rounded-full" />
				<Skeleton className="w-6 h-6 rounded-full" />
			</div>
		</div>
	);
}
