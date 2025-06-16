import React from 'react'
import { Button } from '../button'
import FormControl from './form-control'

const CommonForm = ({ handleSubmit, buttonText, formControls = [], formData, setFormData,isButtonDisabled=false }) => {
  return (
      <form onSubmit={handleSubmit}>
          
      <FormControl formControls={formControls} formData={formData} setFormData={setFormData} />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText || "submit"}</Button>
    </form>
  )
}

export default CommonForm