import React from 'react'
import DataTable from '../../../othreComponents/DataTable'
import { OutSourceCreate } from './OutSourceCreate'
import { useGetAllBomQuery, useGetAllOutSourceQuery } from '../../../../store/apiSlice'
import { SingleOutSource } from './SingleOutSource'

export const OutSourcing =()=> {
  const tableHead=['ds_no','supplier','date']
  const{data:outSourceData}=useGetAllOutSourceQuery()
  const {data:bomData}=useGetAllBomQuery()

  const outSourceDatas=()=>{
    return outSourceData?.data?.map(outSource=>{
      return {...outSource,part_name: bomData?.data?.find(bom=> bom?._id==outSource?.part_name)?.part_name}
    })
  }

return (
    <div className='OutSourcing flex' style={{gap:'5px'}}>
      <div className="out-sourcing-left-section">
        <DataTable tHead={['No',...tableHead]} dataField={outSourceDatas()} DataItemsCmp={SingleOutSource}/>
      </div>
      <div className="out-sourcing-right-section">
        <OutSourceCreate/>
      </div>
    </div>
  )
}