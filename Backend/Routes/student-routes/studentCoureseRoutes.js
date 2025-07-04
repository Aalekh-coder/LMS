const express = require("express");
const {
  getCoursesByStudentId,
} = require("../../Controllers/studentController/studentController");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentId);

module.exports = router;
