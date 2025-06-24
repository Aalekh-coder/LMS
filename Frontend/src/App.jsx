import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";

import StudentViewCommonLayout from "./components/student-view/common-layout";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StudentHomePage from "./pages/student/home";
import InstructorDashboardPage from "./pages/instructor";
import NotFound from "./pages/Not-found";
import AddNewCourse from "./pages/instructor/AddNewCourse";
import StudentViewCoursePage from "./pages/student/Courses";
import StudentViewCourseDetailsPage from "./pages/student/Course-details";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="/home" element={<StudentHomePage />} />
        <Route path="/courses" element={<StudentViewCoursePage />} />
        <Route path="/course/details/:id" element={<StudentViewCourseDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
