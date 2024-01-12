import React, { useState } from 'react'
import { useAddJobCardMutation, useGetAllEmployeesQuery } from '../../../../store/apiSlice'
import { Autocomplete, Button, TextField } from '@mui/material'

export const JobCardCreate = () => {
   const{data:employeeData}=useGetAllEmployeesQuery()
   const[addJobCard]=useAddJobCardMutation()
   const defualtField={
        job:'',
        job_done_by:'',
        date:'',
        start_time:'',
        end_time:'',
        duration:'',
   }
   
   const[dataFiedl,setDataField]=useState(defualtField)
   console.log(dataFiedl)

   const handleCancel=()=>{
    setDataField(defualtField)
    handleCreate()
   }
   
   const handleCreate=()=>{
    addJobCard(dataFiedl)
   }

  return(
    <div className='jobCard_create flex column'> 
    <h3>Create job card</h3>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={employeeData?.data.length>0?employeeData?.data?.map(employee=> employee?.name):[]}
          onChange={(e,v)=>{
            setDataField(pre=> ({...pre,job_done_by:v}))
          }}
          renderInput={(params) => <TextField  {...params}  label="Job done by" variant='standard'  InputLabelProps={{shrink:true,required:true}}  />}
        />
        <TextField onChange={(v)=>{
            setDataField(pre=> ({...pre,job:v.target.value}))
        }} value={dataFiedl?.job} label='Job name' variant='standard' InputLabelProps={{shrink:true,required:true}} />
        
        <TextField onChange={(v)=>{
            setDataField(pre=> ({...pre,date:v.target.value}))
        }} value={dataFiedl?.date} type='date' label='Date' variant='standard' InputLabelProps={{shrink:true,required:true}} />
        
        <TextField onChange={(v)=>{
            setDataField(pre=> ({...pre,start_time:v.target.value}))
        }} value={dataFiedl?.start_time} type='time' label='Start time' variant='standard' InputLabelProps={{shrink:true,required:true}} />

        <TextField onChange={(v)=>{
            setDataField(pre=> ({...pre,end_time:v.target.value}))
        }} value={dataFiedl?.end_time} type='time' label='End time' variant='standard' InputLabelProps={{shrink:true,required:true}} />

        <div className="job_card_btns">
            <Button  onClick={handleCreate}>Create</Button>
            <Button  onClick={handleCancel} >Cancel</Button>
        </div>
    </div>
  )
}
