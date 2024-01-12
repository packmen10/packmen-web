import React, { useState } from 'react'
import { useDeleteJobCardMutation, useGetJobCardQuery, useUpdateJobCardMutation } from '../../../../store/apiSlice'
import { Button, TextField } from '@mui/material'
import removeDuplicates from '../../../../costoumHoks/removeDuplicateFromArray'
import useUpperFirstLetter from '../../../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../../../costoumHoks/removingUnderscoore'

export const SingleJobCard = ({id}) => {
    const{data:jobCardData}=useGetJobCardQuery(id)

    const [updateField,setUpdateField]=useState({})
    const lengthOfUpdatedField=Object.keys(updateField).length;

    const[update]=useUpdateJobCardMutation()
    const[deleteJobCard]=useDeleteJobCardMutation()

    const handleDelete=()=>{
      deleteJobCard(id)
    }
    const handleUpdate=()=>{
      update({id,...updateField})
      setUpdateField({})
    }

    const getData=()=>{
      const inputField=[]
      for(let key in jobCardData?.data){
        if(key!='__v'&&key!='_id'){
          if(key=='job' || key=='job_done_by'||key=='duration'){
            inputField?.push(<TextField
            InputLabelProps={{ shrink: true, required: true }} 
            className={key} 
            label={useUpperFirstLetter(removingUnderscoore(key))}
            value={jobCardData?.data[key]}
            variant='standard'/>)
            continue
          }
            inputField?.push(<TextField onChange={(e)=>setUpdateField(pre=> ({...pre,[key]:e.target.value}))}
            InputLabelProps={{ shrink: true, required: true }} 
            className={key} 
            label={useUpperFirstLetter(removingUnderscoore(key))} 
            value={updateField[key]|| updateField?.hasOwnProperty(key)? null:jobCardData?.data[key]}
            variant='standard'/>)
          }
      }
      return inputField
    }

  return (
    <>
      <div className='SingleJobCard'>
        {
          getData()
        }
      </div>
      <div className="single_job_card_btns flex justify-cen" style={{paddingTop:'8px',gap:'5px'}}>
        <Button onClick={handleDelete}  >Delete</Button>
        {lengthOfUpdatedField>0 &&(<Button onClick={handleUpdate} variant='contained' style={{textTransform:'none',color:'white'}}>Save</Button>)}
      </div>
    </>
  )
}
