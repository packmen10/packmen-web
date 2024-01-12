import React from 'react'
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetAllCustomerQuery, useUpdateCustomerMutation } from '../../../../store/apiSlice'
import { CreateItems } from '../../../othreComponents/CreateItems'


export const Customer_cmp = () => {
    const{data:customerData}=useGetAllCustomerQuery()
    const[deleteCustomer]=useDeleteCustomerMutation()
    const[updateCustomer]=useUpdateCustomerMutation()
    const[createCustomer]=useCreateCustomerMutation()

    const fieldName=[
        {name:'No',type:''},
        {name:'name',type:'text'},
        {name:'address',type:'text'},
        {name: 'gst_no',type:'text'},
        {name:'phone_no',type:'text'}
    ]

  return (
    <div className='customer-cmp'>
      <CreateItems add={createCustomer} dataField={customerData} deleteItem={deleteCustomer} update={updateCustomer} titileField={fieldName} titile='customer' />
    </div>
  )
}
