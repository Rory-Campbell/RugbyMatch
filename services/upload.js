const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("config");

cloudinary.config({
  cloud_name: config.get("CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "rugbyMatch",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const upload = multer({ storage: storage });

module.exports = upload;
