import { createContext, useState } from "react";

export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCourseList, setStudentViewCourseList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseDetailsId, setcurrentCourseDetailsId] = useState(null);
  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);
  const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] =
    useState({});
  return (
    <StudentContext.Provider
      value={{
        studentViewCourseList,
        loadingState,
        setLoadingState,
        setStudentViewCourseList,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setcurrentCourseDetailsId,
        studentBoughtCoursesList,
        setStudentBoughtCoursesList,
        studentCurrentCourseProgress,
        setStudentCurrentCourseProgress,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
