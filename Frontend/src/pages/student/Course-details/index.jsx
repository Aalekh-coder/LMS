import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Globe, Lock, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailService,
} from "@/services";
import React, { useContext, useEffect, useState } from "react";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

const StudentViewCourseDetailsPage = () => {
  const navigate = useNavigate()
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setcurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");

  const { id } = useParams();
  const location = useLocation();

  async function fetchIntructorCourseDetail() {
    const checkCoursePurchaseInfoReponse = await checkCoursePurchaseInfoService(currentCourseDetailsId, auth?.user?._id)
    
    console.log(checkCoursePurchaseInfoReponse);

    if (checkCoursePurchaseInfoReponse?.success && checkCoursePurchaseInfoReponse?.data) {
      navigate(`/course-progress/${currentCourseDetailsId}`)
      return
    }

    const response = await fetchStudentViewCourseDetailService(
      currentCourseDetailsId
    );


    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  useEffect(() => {
    if (currentCourseDetailsId !== null) {
      fetchIntructorCourseDetail();
    }
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setcurrentCourseDetailsId(id);
  }, [id]);

  function handleSetFreePreview(getCurrentVideoInfo) {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instuctorId,
      instructorName: studentViewCourseDetails?.instuctorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    const response = await createPaymentService(paymentPayload);
    if (response?.success) {
      sessionStorage?.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) {
      setShowFreePreviewDialog(true);
    }
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (!location?.pathname.includes("course/details")) {
      setStudentViewCourseDetails(null);
      setcurrentCourseDetailsId(null);
    }
  }, [location?.pathname]);

  const getIndexOfFreePreviewURl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item?.freePreview
        )
      : -1;

  if (loadingState) return <Skeleton />;

 
  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-rose-500 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>

        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {studentViewCourseDetails?.instuctorName}</span>
          <span>
            Created On {studentViewCourseDetails?.date?.split("T")[0]}
          </span>
          <span className="flex items-center capitalize">
            <Globe className="mr-1 h-4 w-4" />
            {studentViewCourseDetails?.primaryLanguage}
          </span>
          <span className="ml-3">
            {" "}
            {studentViewCourseDetails?.student?.length}{" "}
            {studentViewCourseDetails?.student?.length <= 1
              ? "Student"
              : "Students"}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you will Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => {
                    return (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    );
                  })}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                {studentViewCourseDetails?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum?.map(
                (curriculumItem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => handleSetFreePreview(curriculumItem)
                          : null
                      }
                      className={`${
                        curriculumItem?.freePreview
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } flex items-center mb-4`}
                    >
                      {curriculumItem?.freePreview ? (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <Lock className="mr-2 h-4 w-4" />
                      )}
                      <span>{curriculumItem?.title}</span>
                    </li>
                  );
                }
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewURl !== -1
                      ? studentViewCourseDetails.curriculum[
                          getIndexOfFreePreviewURl
                        ].videoUrl
                      : "http://res.cloudinary.com/drqln2yd0/video/upload/v1750503009/f7cco6yk2f7q2ugvs26k.mp4"
                  }
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${studentViewCourseDetails?.pricing}
                </span>
              </div>
              <Button
                onClick={handleCreatePayment}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
            <DialogDescription className="hidden">
              Course Preview
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
              <VideoPlayer url={displayCurrentVideoFreePreview} />
            </div>
            <div>
              {studentViewCourseDetails?.curriculum
                ?.filter((item) => item.freePreview)
                ?.map((filteredItem) => (
                  <p
                    onClick={() => handleSetFreePreview(filteredItem)}
                    key={filteredItem?.title}
                    className="cursor-pointer text-16px"
                  >
                    {filteredItem?.title}
                  </p>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentViewCourseDetailsPage;
