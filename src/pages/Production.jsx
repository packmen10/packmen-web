import React from 'react'
import { ProductionLeftSide } from '../components/production/productionLeftSide/ProductionLeftSide'
import {useSelector } from 'react-redux'

import { Work_order } from '../components/production/productionLeftSide/work_order/Work_order'
import { Customer_cmp } from '../components/production/productionLeftSide/customer/Customer_cmp'
import { BomCom } from '../components/production/productionLeftSide/work_order/nextedComponent/BomCom'
import { Mir } from '../components/production/productionLeftSide/mir/Mir'
import { Machining_log } from '../components/production/productionLeftSide/machining_log/Machining_log'
import { JobCard } from '../components/production/productionLeftSide/jobCard/JobCard'
import { OutSourcing } from '../components/production/productionLeftSide/out_sourcing/OutSourcing'
import { Qc } from '../components/qc/Qc'

export const Production = () => {
      const productionNavigationstatus= useSelector(state=>state.productionNavigation.normelField)

  return (
    <div className='production-main'>
        <ProductionLeftSide/>
        {productionNavigationstatus?.customer&&<Customer_cmp/>}
        {productionNavigationstatus?.work_order&&<Work_order/>}
        {productionNavigationstatus?.bom&&<BomCom/>}
        {productionNavigationstatus?.MIR&&<Mir/>}
        {productionNavigationstatus?.Machining_log&&<Machining_log/>}
        {productionNavigationstatus?.Job_card && <JobCard/>}
        {productionNavigationstatus?.Out_sourcing && <OutSourcing/>}
        {productionNavigationstatus?.QC && <Qc/>}
    </div>
  )
}