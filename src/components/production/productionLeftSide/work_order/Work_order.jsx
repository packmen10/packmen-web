import { useState } from "react"
import { useGetAllCustomerQuery, useGetAllWorkOrderNoQuery } from "../../../../store/apiSlice"
import DataTable from "../../../othreComponents/DataTable"
import { CreateAndEditWorkOrder } from "./CreateAndEditWorkOrder"
import { NextedComponent } from "./nextedComponent/NextedComponent"


export const Work_order = () => {
  const{data:workOrderAllData}=useGetAllWorkOrderNoQuery()
  const{data:cusstomerAllData}=useGetAllCustomerQuery()
  const[selectedData,setSelectedData]=useState(null)

  const workOrderData=[
    {name:'work_no',type:'text'},
    {name:'work_date',type:'date'},
    {name:'customer',type:'text'},
    {name:'product_description',type:'text'},
    {name:'delivery_date',type:'date'},
  ]

  const rplaysCustomerIdByname=()=>{
    return workOrderAllData?.data?.map(work=>{
        if(cusstomerAllData?.data?.find(customer=> customer?._id==work?.customer )){
          return {...work,customer:cusstomerAllData?.data?.find(customer=> customer?._id==work?.customer)?.name}
        }else{
          return {...work,customer:'not present'}
        }
      }
    )
  }

  return(

    <div className='work-order'>
      <div className="table-section">
        <DataTable DataItemsCmp={NextedComponent} tHead={['No',...workOrderData?.map(wor=>wor?.name)]} dataField={rplaysCustomerIdByname()} removeOneEle={4} cb={setSelectedData}/>  
      </div>
      <CreateAndEditWorkOrder createField={workOrderData} resetDataFromEdit={setSelectedData} selectedDataForEdit={selectedData}/>

    </div>
  )
}