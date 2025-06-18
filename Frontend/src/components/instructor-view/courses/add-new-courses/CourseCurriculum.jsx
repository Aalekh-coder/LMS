import MediaProgressBar from "@/components/Media-Progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "@/services";
import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import React, { useContext, useRef } from "react";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setcourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const bulkUploadInputRef = useRef(null);

  function handleNewLecture() {
    setcourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setcourseCurriculumFormData(copyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setcourseCurriculumFormData(copyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);

        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response?.success) {
          let copyCourseCurriculumFormData = [...courseCurriculumFormData];
          copyCourseCurriculumFormData[currentIndex] = {
            ...(copyCourseCurriculumFormData[currentIndex] = {
              ...copyCourseCurriculumFormData[currentIndex],
              videoUrl: response?.data?.url,
              public_id: response?.data?.public_id,
            }),
          };
          setcourseCurriculumFormData(copyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPubic =
      copyCourseCurriculumFormData[currentIndex]?.public_id;

    const deteleCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPubic
    );

    console.log(deteleCurrentMediaResponse, "deteleCurrentMediaResponse");

    if (deteleCurrentMediaResponse?.success) {
      copyCourseCurriculumFormData[currentIndex] = {
        ...courseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };
      setcourseCurriculumFormData(copyCourseCurriculumFormData);
    }

    console.log(copyCourseCurriculumFormData, "copyCourseCurruculum");
  }

  const isCourseCurriculumFormDataVaild = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }


  function areAllCourseCurriculumFormDataObjectEmpty(arr) {
    return arr.every((obj)=>{
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true
        }
        return value === ""
      })
    })
  }
    
  async function handleMediaBulkUpload(e) {
    const selectedFiles = Array.from(e.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );


      if (response?.success) {
        let copyCourseCurriculumFormData = areAllCourseCurriculumFormDataObjectEmpty(courseCurriculumFormData) ?
          []: [...courseCurriculumFormData]

        copyCourseCurriculumFormData = [
          ...copyCourseCurriculumFormData,
          ...response.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${copyCourseCurriculumFormData.length + index+1}`,
            freePreview:false
          }))
       ]
        setcourseCurriculumFormData(copyCourseCurriculumFormData);
        setMediaUploadProgress(false)
      }
    } catch (error) {
      console.log(error);
    }

  }

  async function handleDeleteLecture(currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    console.log(copyCourseCurriculumFormData[currentIndex]);
    const getCurrentSelectedVideoPublicId = copyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);
    if (response?.success) {
      copyCourseCurriculumFormData = copyCourseCurriculumFormData.filter((_, index) => index !== currentIndex);
      
      setcourseCurriculumFormData(copyCourseCurriculumFormData)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handleMediaBulkUpload}
          />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer"
            onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleNewLecture}
          disabled={!isCourseCurriculumFormDataVaild() || mediaUploadProgress}
        >
          Add Lecture
        </Button>

        <div className="p-4">
          {mediaUploadProgress ? (
            <MediaProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercentage}
            />
          ) : null}
        </div>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData?.map((curriculumItem, index) => (
            <div className="border p-5 rounded-md" key={index}>
              <div className="flex gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture title"
                  className="max-w-96"
                  onChange={(e) => handleCourseTitleChange(e, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`freePreview-${index + 1}`}
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3 ">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height="300px"
                    />
                    <Button onClick={() => handleReplaceVideo(index)}>
                      Replace Video
                    </Button>
                    <Button className="bg-rose-400" onClick={()=>handleDeleteLecture(index)}>Delete Lecture</Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="mb-4"
                    onChange={(e) => handleSingleLectureUpload(e, index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
