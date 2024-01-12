import React from 'react'
import { useSelector } from 'react-redux'
import { BomCreate } from './BomCreate'
import {useGetbomByWorkOrderIdQuery } from '../../../../../store/apiSlice'

import SingleBomAccordion from './SingleBomAccordion'
import BomMainTable from './BomMainTable'
export const BomCom = () => {
  const workOrderId=useSelector(state=>state?.productionNavigation?.normelField?.bom)
  /* const {data:bomAllData}=useGetAllBomQuery() */
  const {data:bomData}=useGetbomByWorkOrderIdQuery(workOrderId)
  
  const fields=[
        'section',
        'part_name',
        'part_no',
        'work_order_no',
        'Status'
      ]

  return (
    <div className='bom flex' style={{gap:'5px'}}>

        <div className="left-section-bom ">
          <BomMainTable dataField={bomData?.data} removeOneEle={4} tHead={['No',...fields]} DataItemsCmp={SingleBomAccordion}/>
        </div>
        
        <div className="right-create-section-bom">
          <BomCreate fields={fields} id={workOrderId} />
        </div>

    </div>
  )
}