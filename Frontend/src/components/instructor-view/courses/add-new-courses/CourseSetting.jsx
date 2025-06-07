import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import React, { useContext } from "react";

const CourseSetting = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  async function handleImageUploadChange(e) {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        const response = await mediaUploadService(imageFormData);

        if (response?.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response?.data?.url,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData?.image} className="rounded-xl"/>
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUploadChange(e)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSetting;
