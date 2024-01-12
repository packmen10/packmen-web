import React from 'react'
import DataTable from '../../../othreComponents/DataTable'
import { Machining_log_create } from './Machining_log_create'
import { useGetAllBomQuery, useGetAllMachining_logQuery } from '../../../../store/apiSlice'
import { SingleMachining_log } from './SingleMachining_log'

export const Machining_log = () => {
  const{data:machinigData}=useGetAllMachining_logQuery()
  const{data:bomData}=useGetAllBomQuery()

  const outSourceDatas=()=>{
    return machinigData?.data?.map(data=>{
      return {...data,part_name: bomData?.data?.find(bom=> bom?._id==data?.part_name)?.part_name}
    })
  }

  return (
    <div className='machining_log flex' style={{
      maxWidth:'80vw',
      width:'100%'
    }}>
        <div className="machining_log_left" style={{
          maxWidth:'60vw',
          width:'100%'
        }}>
            <DataTable tHead={['No','part_name','machine_type','operator','date','start_time','end_time','duration','quantity']} dataField={outSourceDatas()} DataItemsCmp={SingleMachining_log}  />
        </div>
        <div className="machining_log_right" style={{
          maxWidth:'20vw',
          width:'100%'
        }}>
            <Machining_log_create  />
        </div>
    </div>
  )
}