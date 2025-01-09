import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {formatRelative, subDays} from "date-fns";
type ProfileUserProps = {
	name: string;
	imageURL: string;
	timeCreate: number;
};

export default function ProfileUser({name, imageURL, timeCreate}: ProfileUserProps) {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<Avatar className="size-9">
					<AvatarImage src={imageURL} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</HoverCardTrigger>

			<HoverCardContent className="flex items-center space-x-2">
				<Avatar>
					<AvatarImage src={imageURL} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<p className="font-semibold">{name}</p>
					<p>{formatRelative(subDays(new Date(timeCreate), 3), new Date())}</p>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
