import React from 'react'
import { PoRightSection } from './PoRightSection'
import { useGetAllPoQuery } from '../../store/apiSlice'
import DataTable from '../othreComponents/DataTable'
import { ItemsAddingSection } from './ItemsAddingSection'


export const PurchaceOrder = () => {
  const {data:poData}=useGetAllPoQuery()
/*seller,po number,mir items,date,bom id,mir id,*/
  return (
    <div className='purchace-order flex ' style={{maxWidth:"80vw",width:"100%",gap:'5px'}}>
      <div className="left-pagenation-table-section" style={{maxWidth:"60vw",width:"100%"}}>
          <DataTable tHead={['No','seller','date','po_no']} dataField={poData?.data} DataItemsCmp={ItemsAddingSection}/>
      </div>

      <div className="right-create-section" style={{width:"100%",maxWidth:"20vw"}} >
        <PoRightSection/>
      </div>
    </div>
  )
}
