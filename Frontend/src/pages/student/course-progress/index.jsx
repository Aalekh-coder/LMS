import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentViewCourseProgress = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col h-screen bg-[#1c1d1f] text-white'>
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b">
        <div className="flex items-center space-x-4">
          <Button className="text-black" variant="ghost" size="sm" onClick={()=>navigate("/student-courses")}>
            <ChevronLeft className='h-4 w-4 mr-2' />
            Back to My Course Page
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StudentViewCourseProgress