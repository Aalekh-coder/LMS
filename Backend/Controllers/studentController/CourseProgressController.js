const Course = require("../../Models/Course");
const CourseProgress = require("../../Models/Course");
const StudentCourses = require("../../Models/StudentCourse");

// marked current lecture as views
const markCurrentLectureAsViewed = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error ocurred!",
    });
  }
};

// get current course progress

const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentPurchasedCourse = await StudentCourses.findOne({ userId });

    const isCurrentCoursePurchaseByCurrentUserOrNot =
      studentPurchasedCourse?.courses?.findIndex(
        (item) => item?.courseId === courseId
      ) > -1;

    if (!isCurrentCoursePurchaseByCurrentUserOrNot) {
      return res.status(200).json({
        success: false,
        data: {
          isPurchased: false,
        },
        message: "You need to purchased this course to access it",
      });
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    }).populate("courseId");

    if (currentUserCourseProgress?.lecturesProgress?.length === 0) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "No progress found, you can start watching the course",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        courseDetails: currentUserCourseProgress?.courseId,
        progress: currentUserCourseProgress?.lecturesProgress,
        completed: currentUserCourseProgress?.completed,
        completionDate: currentUserCourseProgress?.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error ocurred!",
    });
  }
};

//reset course progress

const resetCurrentCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error ocurred!",
    });
  }
};

module.exports = {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
};
