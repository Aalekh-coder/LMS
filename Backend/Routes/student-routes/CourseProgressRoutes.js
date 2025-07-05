const express = require("express");
const {
  getCurrentCourseProgress,
} = require("../../Controllers/studentController/CourseProgressController");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);

module.exports = router;
