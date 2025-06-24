require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT, CLIENT_URL } = require("./Config/env");
const connectToDB = require("./Config/db");
const AuthRoutes = require("./Routes/AuthRoutes");
const mediaRoutes = require("./Routes/instructor-routes/MediaRoutes");
const instructorCourseRoute = require("./Routes/instructor-routes/course-routes");
const studentViewCourseRoute = require("./Routes/student-routes/CourseRoutes");
const studentViewOrderRoute = require("./Routes/student-routes/Order-routes");


const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// router

app.use("/auth", AuthRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoute);
app.use("/student/course", studentViewCourseRoute);
app.use("/student/order", studentViewOrderRoute);

app.listen(PORT, () => {
  connectToDB();
  console.log(`http://localhost:${PORT}`);
});
