const express = require("express");
const multer = require("multer");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../../helpers/Cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      data: result,
      message: "video upload successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading file" });
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assest Id is required",
      });
    }

    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "Assest delete successfully from cloudinary",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading delete" });
    console.log(error);
  }
});

router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    const uploadPromise = req.files.map(fileItem => uploadMediaToCloudinary(fileItem.path));
    const result = await Promise.all(uploadPromise);

    res.status(200).json({
      success: true,
      data:result
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error bulk upload",
    });
  }
});

module.exports = router;
