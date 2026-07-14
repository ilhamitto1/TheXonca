import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 12 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
  mediaUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 40 },
    video: { maxFileSize: "64MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
