import { GraduationCap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const StudentViewCommonHeader = () => {
  return (
      <div className="flex items-center justify-between p-4 border-b relative">
          <div className="flex items-center space-x-4">
              <Link to="/home">
                  <GraduationCap className="h-8 w-8 mr-4 hover:text-purple-500" />
                  <span className="font-extrabold">LMS LEARN</span>
              </Link>
          </div>
    </div>
  );
};

export default StudentViewCommonHeader;
