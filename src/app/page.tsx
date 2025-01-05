import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="flex gap-4 flex-col items-center">
			<SignedIn>
				<SignOutButton>
					<Button>Log out</Button>
				</SignOutButton>
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Log in</Button>
				</SignInButton>
			</SignedOut>
			<span>{process.env.CLERK_HOSTNAME}</span>
		</main>
	);
}
