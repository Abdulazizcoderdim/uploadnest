import z from "zod";

export const fileIdSchema = z.string().trim().min(1);

const baseSchema = z.object({
  fileIds: z
    .array(z.string().length(24, "Invalid file ID"))
    .min(1, "At least one file ID must be provided"),
});

export const deleteFilesSchema = baseSchema;
export const downloadFilesSchema = baseSchema;

export type DeleteFilesSchemaType = z.infer<typeof deleteFilesSchema>;
export type DownloadFilesSchemaType = z.infer<typeof downloadFilesSchema>;
