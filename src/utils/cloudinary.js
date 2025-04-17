import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return;
    const uploadedFile = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded on cloudinary
    console.log(uploadedFile);

    fs.unlinkSync(localFilePath)
    return uploadedFile;
  } catch (err) {
    /* We want to unlink file if we face any error while uploading it, we would unlink it synchronously before performing any other operation  */
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export { uploadOnCloudinary };
// cloudinary.uploader.upload()
