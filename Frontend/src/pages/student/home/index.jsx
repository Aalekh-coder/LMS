import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const { resetCredentials, auth } = useContext(AuthContext);
  const { studentViewCourseList, setStudentViewCourseList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesToPage(getCurrentCourseId) {
    sessionStorage?.removeItem("filters");
    const currentFilter = {
      category: [getCurrentCourseId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses")
  }

  async function fetchAllStudentViewCourse() {
    const response = await fetchStudentViewCourseListService();
    console.log(response);

    if (response?.success) {
      setStudentViewCourseList(response?.data);
    }
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourse();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p>Skills for your present and your future. Get Started with Us</p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src="https://i.pinimg.com/736x/46/e1/bc/46e1bce13e01cb93b7f8e435019c3e41.jpg"
            alt="banner"
            className="h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories?.map((item, index) => {
            return (
              <Button
                className="justify-start"
                variant="outline"
                key={index}
                onClick={() => handleNavigateToCoursesToPage(item?.id)}
              >
                {item?.label}
              </Button>
            );
          })}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCourseList && studentViewCourseList?.length > 0 ? (
            studentViewCourseList?.map((courseItem) => (
              <div
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
                key={courseItem?.title}
                onClick={() => handleCourseNavigate(courseItem?._id)}
              >
                <img
                  src={courseItem?.image}
                  width="300"
                  height="150"
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3>{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem.instuctorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    $ {courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Course found</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentHomePage;
