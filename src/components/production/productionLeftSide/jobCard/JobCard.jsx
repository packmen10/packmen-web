import React from 'react'
import DataTable from '../../../othreComponents/DataTable'
import { JobCardCreate } from './JobCardCreate'
import { useGetAllJobCardQuery } from '../../../../store/apiSlice'
import { SingleJobCard } from './SingleJobCard'
import { Button } from '@mui/material'


export const JobCard = () => {
  const{data:allJobCardData}=useGetAllJobCardQuery()
  return (
    <div className='job_card flex' style={{
      maxWidth:'80vw',
      width:'100%',
      gap:'5px'
    }}>
      <div className="left-section" style={{
        maxWidth:'60vw',
        width:'100%'
      }}>
        <DataTable tHead={['No','job','job_done_by','date','start_time','end_time','duration']} dataField={allJobCardData?.data} DataItemsCmp={SingleJobCard}/>
      </div>
      <div className="right-create-section" style={{
        maxWidth:'20vw',
        width:'100%'
      }}>
        <JobCardCreate/>
      </div>
    </div>
  )
}