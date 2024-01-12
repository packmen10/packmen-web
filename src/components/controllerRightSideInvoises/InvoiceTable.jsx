import React from 'react'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { useGetAllInvoiceQuery, useGetSellersQuery, useGetStoreItemsQuery } from '../../store/apiSlice'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import { useDispatch } from 'react-redux'
import { changeTheStatusOfStoreState } from '../../store/storeNavigation'
import { InvoiceDetailes } from './InvoiceDetailes'
import { Table } from '../othreComponents/Table'
import DataTable from '../othreComponents/DataTable'

const InvoiceTable = ({invoiceItems}) => {
    const{isLoading,data:invoiceData,error}=useGetAllInvoiceQuery()
    const dispatch=useDispatch()
    
    const handleDetailes=(id)=>{
      dispatch(changeTheStatusOfStoreState({key:'invoiceDetailes',status:id}))
    }

  return (
    <DataTable tHead={['No',"invoice_date","invoice_no"]} DataItemsCmp={InvoiceDetailes} dataField={invoiceData?.data} />
  )
}
export default InvoiceTable


