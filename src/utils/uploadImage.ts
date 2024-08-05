"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export async function uploadFromBuffer(file: File): Promise<UploadApiResponse> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);

          return;
        }
        resolve(result as UploadApiResponse);
      })
      .end(buffer);
  });
}
