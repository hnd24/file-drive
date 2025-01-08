"use client";

import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import {useOrganization} from "@clerk/nextjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "convex/react";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {api} from "../../convex/_generated/api";
import {types} from "../constant/typesFile";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	files: z
		.any()
		.refine(files => files instanceof FileList && files.length > 0, {message: "File is required"}),
});

export default function UploadButton() {
	const [isFileDialog, setIsFileDialog] = useState(false);

	const {organization} = useOrganization();
	const generateUploadUrl = useMutation(api.file.generateUploadUrl);
	const createFile = useMutation(api.file.createFile);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const fileRef = form.register("files");

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const postUrl = await generateUploadUrl();
			for (const file of values.files) {
				const result = await fetch(postUrl, {
					method: "POST",
					headers: {"Content-Type": file.type},
					body: file,
				});
				const {storageId} = await result.json();
				console.log("file", file.type);
				createFile({
					name: values.title,
					fileId: storageId,
					orgId: organization?.id ?? "",
					type: types[file.type],
				});
			}
			setIsFileDialog(false);
			form.reset();
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error uploading file",
				description: "Your file could not be uploaded, please try again later.",
			});
		} finally {
			toast({
				variant: "success",
				title: "File uploaded",
				description: "Now everyone can see your file.",
			});
		}
	}

	const {toast} = useToast();
	return (
		<div>
			<Dialog open={isFileDialog} onOpenChange={setIsFileDialog}>
				<DialogTrigger asChild>
					<Button className="font-semibold tracking-wide hover:bg-white hover:text-black hover:shadow-lg">
						Upload File
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload your file</DialogTitle>
						<DialogDescription />
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="title"
									render={({field}) => (
										<FormItem>
											<FormLabel>Your title file</FormLabel>
											<FormControl>
												<Input placeholder="younger chicken" {...field} />
											</FormControl>
											<FormDescription />
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="files"
									render={() => (
										<FormItem>
											<FormLabel>Your file</FormLabel>
											<FormControl>
												<Input type="file" multiple {...fileRef} />
											</FormControl>
											<FormDescription />
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting && <Loader2 className=" animate-spin" />}
									submit
								</Button>
							</form>
						</Form>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
