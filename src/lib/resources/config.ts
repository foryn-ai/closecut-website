const enabled = (value: string | undefined) => value !== "false";

export const RESOURCES_TRACK_CITATIONS = enabled(process.env.RESOURCES_TRACK_CITATIONS);
export const RESOURCES_TRACK_WORKSHEETS = enabled(process.env.RESOURCES_TRACK_WORKSHEETS);
