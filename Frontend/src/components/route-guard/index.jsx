import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = ({ authenticated, user, element }) => {
  const location = useLocation();


  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"} />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
    // return <Navigate to="/course/details/68568e9655e8a01ea25d1d05" />;
  }

  if (
    authenticated &&
    user?.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to={"/instructor"} />;
  }

  return <>{element}</>;
};

export default RouteGuard;
