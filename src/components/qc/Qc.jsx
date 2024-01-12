import React from 'react'
import { QcCreateSection } from './QcCreateSection'
import DataTable from '../othreComponents/DataTable'
import { useGetAllQcQuery } from '../../store/apiSlice'
import { SingleQc } from './SingleQc'

export const Qc = () => {
  const{data:qcData}=useGetAllQcQuery()
  return (
    <div className='qc flex' style={{maxWidth:'80vw',width:'100%',gap:'5px'}}>
      <div className="table_section" style={{maxWidth:'60vw',width:'100%'}} >
         <DataTable tHead={['No','part_name','qc_done_by','section','date']} DataItemsCmp={SingleQc} dataField={qcData?.data}/>
      </div>
      <div className="createSection" style={{maxWidth:'20vw',width:'100%'}} >
        <QcCreateSection/>
      </div>
    </div>
  )
}
