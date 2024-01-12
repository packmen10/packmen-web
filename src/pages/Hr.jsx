import React from 'react'

import { useAddNewEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation } from '../store/apiSlice'
import { CreateItems } from '../components/othreComponents/CreateItems'
import { HrLeftSection } from '../components/hr_section/HrLeftSection'

export const Hr = () => {

  const {data:allEmployeesData}=useGetAllEmployeesQuery()
  const[deleteEmployee]=useDeleteEmployeeMutation()
  const [updateEmployee]=useUpdateEmployeeMutation()
  const [addNewEmployee]=useAddNewEmployeeMutation()

  const fieldNames=[
    {name:'No',type:''},
    {name:'name',type:'text'},
    {name:'address',type:'text'},
    {name:'phone_no',type:'text'},
    {name: 'employee_id',type:'text'},
    {name: 'designation',type:'text'},
    {name: 'joint_date',type:'date'},
  ]

  return (
    <div className="hr-section" style={{padding:"128px 5px 0 5px",maxWidth:"100%"}}>
      <HrLeftSection/>
      <CreateItems add={addNewEmployee} dataField={allEmployeesData} deleteItem={deleteEmployee} update={updateEmployee}  titileField={
        fieldNames
      } titile='Employee'  />
    </div>
  )
}