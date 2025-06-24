const express = require("express");
const {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
} = require("../../Controllers/studentController/CourseController");

const router = express.Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);

module.exports = router;
