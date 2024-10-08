import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const saltie = await auth(req);

      // If you throw, the saltie will not be able to upload
      if (!saltie) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { saltieId: saltie.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for saltieId:", metadata.saltieId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.saltieId };
    }),
  fileUploader: f({ blob: { maxFileSize: "16MB" } }) // Adjust maxFileSize as needed
    .middleware(async ({ req }) => {
      const saltie = await auth(req);
      if (!saltie) throw new UploadThingError("Unauthorized");
      return { saltieId: saltie.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for saltieId:", metadata.saltieId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.saltieId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
