import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCouresService } from "@/services";
import { Watch } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentCoursesPage = () => {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
const navigate = useNavigate()

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCouresService(auth?.user?._id);
    if (response?.success) setStudentBoughtCoursesList(response?.data);

  }

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);


  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold mb-8">My Courese</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList?.map((item) => (
            <Card key={item?.courseId} className="flex flex-col" >
              <CardContent className="p-4 flex-grow">
                <img
                  src={item?.courseImage}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />

                <h3 className="font-bold mb-1">{item?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{item?.instructorName}</p>
              </CardContent>
              <CardFooter>
                <Button className="flex-1" onClick={() => navigate(`/course-progress/${item?.courseId}`)}>
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching 
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Course found</h1>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
