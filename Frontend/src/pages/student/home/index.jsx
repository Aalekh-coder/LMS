import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';
import React, { useContext } from 'react'

const StudentHomePage = () => {
  const {resetCredentials} = useContext(AuthContext)


  function handleLogout() {
    resetCredentials();
    sessionStorage.clear()
  }

  return (
    <div>
      <Button onClick={handleLogout} className=''>Logout</Button>
    </div>
  )
}

export default StudentHomePage