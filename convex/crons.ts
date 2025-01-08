import {cronJobs} from "convex/server";
import {internal} from "./_generated/api";

const crons = cronJobs();

crons.monthly(
	"delete any old files marked for deletion",
	{day: 1, hourUTC: 16, minuteUTC: 0}, // Every month on the first day at 8:00am PST
	internal.file.deleteAllFiles,
);

export default crons;
