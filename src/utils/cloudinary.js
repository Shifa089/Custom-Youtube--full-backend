import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    //file upload successfully
    // console.log("File uploaded on cloudinary",response.url);
    fs.unlinkSync(localFilePath); 
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved temporary file as the upload operation got failed
    // console.log("Not uploaded");
    // console.log("Cloudinary Error: ",error);
    return null;
  }
};

export {uploadOnCloudinary};
