import CourseCurriculum from '@/components/instructor-view/courses/add-new-courses/CourseCurriculum'
import CourseSetting from '@/components/instructor-view/courses/add-new-courses/CourseSetting'
import CoursLandingPage from '@/components/instructor-view/courses/add-new-courses/CoursLandingPage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewCourse = () => {


  return (
    <div className='container mx-auto p-4'>
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create a new Course</h1>
        <Button className="text-sm tracking-wider font-bold px-8 ">Submit</Button>
      </div>

      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum"><CourseCurriculum /></TabsContent>
              <TabsContent value="course-landing-page"><CoursLandingPage /></TabsContent>
              <TabsContent value="settings"><CourseSetting /></TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddNewCourse