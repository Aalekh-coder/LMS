import { GraduationCap, TvMinimalPlay } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";

const StudentViewCommonHeader = () => {
  const { resetCredentials } = useContext(AuthContext);
const navigate = useNavigate()

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear()
  }

  return (
    <div className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex inset-x-0 hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 hover:text-purple-500" />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            className="text-[14px] md:text-[16px] font-medium"
            variant="ghost"
            onClick={() => navigate("/courses") ? null : navigate("/courses")}
          >
            Explore Course
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/student-courses")}>
            <span className="font-extrabold md:text-xl text-[14px]" >My Course</span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>SignOut</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentViewCommonHeader;
