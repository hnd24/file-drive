import {Doc} from "../../convex/_generated/dataModel";

export const types = {
	"image/jpeg": "image",
	"image/png": "image",
	"image/gif": "image",
	"application/pdf": "pdf",
	"text/csv": "csv",
	"image/svg+xml": "image",
} as Record<string, Doc<"files">["type"]>;
