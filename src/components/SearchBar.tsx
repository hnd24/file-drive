import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2, SearchIcon} from "lucide-react";
import {Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
	query: z.string().min(1, "empty query"),
});

type Props = {
	className?: string;
	setQuery?: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({className, setQuery}: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			query: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setQuery?.(values.query);
	}

	return (
		<div className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="query"
						render={({field}) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex gap-2">
										<Input
											className="w-full"
											placeholder="Inter your name file"
											{...field}
											disabled={form.formState.isSubmitting}
										/>
										<Button disabled={form.formState.isSubmitting} type="submit">
											{form.formState.isSubmitting ? (
												<Loader2 className="animate-spin" />
											) : (
												<SearchIcon />
											)}
										</Button>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
