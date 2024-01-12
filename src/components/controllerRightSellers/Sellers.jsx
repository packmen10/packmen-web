import React from 'react'
import { useAddSellerMutation, useDeleteSellerMutation, useGetAllSellersQuery, useUpdateSellersMutation } from '../../store/apiSlice'
import { CreateItems } from '../othreComponents/CreateItems'


export const Sellers = () => {
  
  const {data:sellers}=useGetAllSellersQuery()
  const [updateSeller]=useUpdateSellersMutation()
  const[deleteSeller]=useDeleteSellerMutation()
  const[addNewSeller]= useAddSellerMutation()

  const fieldName=[
    {name:'No',type:''},
    {name:'name',type:'text'},
    {name:'address',type:'text'},
    {name:'phone_no',type:'text'},
    {name: 'gst_no',type:'text'}
  ]

  return (
    <div className="sellers">
       <CreateItems add={addNewSeller} update={updateSeller} deleteItem={deleteSeller} titileField={fieldName} dataField={sellers} titile='supplier'/>
    </div>
  )
}