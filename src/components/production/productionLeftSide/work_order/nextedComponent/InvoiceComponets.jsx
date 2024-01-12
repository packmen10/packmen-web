import React, { useEffect } from 'react'
import {useGetBomInvoiceQuery } from '../../../../../store/apiSlice'

export const InvoiceComponets = ({setProgress,id,index}) => {
  const {data:invoiceBomData}=useGetBomInvoiceQuery(id)

  useEffect(()=>{
    if(invoiceBomData?.data?.length>0)
    setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
  },[invoiceBomData])
  
    const tableHeadeStyle={backgroundColor:'#347dac',color:'white',borderRadius:'5px'}
    
  if(invoiceBomData?.data?.length>0)
  return(
    <div className='InvoiceComponets flex justify-cen'>
      <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
            <thead>
              <tr>
                  <td style={tableHeadeStyle}>No</td>
                  <td style={tableHeadeStyle}>Mir no</td>
                  <td style={tableHeadeStyle}>mir date</td>
              </tr>
            </thead>
            <tbody>
                {
                  invoiceBomData?.data?.map((invoice,no)=>{
                      return <tr >
                      <td>{no+1}</td>
                      <td>{invoice?.invoice_no}</td>
                      <td>{invoice?.invoice_date}</td>
                  </tr>
                  })
                }
            </tbody>
      </table>
    </div>
  )
  else
  return <h4 style={{textAlign:'center',width:'100%'}}>Empty</h4>
}