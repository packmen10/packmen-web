import React from 'react'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'


export const SellerAndUpdate = ({sellersText,invoiceText,sellerData,dataItemData,handleBack,deleteInvoice}) => {

    const handleDleteInvoice=(id)=>{
        deleteInvoice(id)
        handleBack()
    }
  return (
    <div className="description">
    <div className="sellers">
        {sellersText?.map((el,i)=>{
            return(
                <div key={i*322} className="labelInput">
                    <label htmlFor="">{useUpperFirstLetter(el)}</label>
                    <input disabled type="text" value={sellerData[el]} />
                </div>
            )
        })}
    </div>
    <div className="detailes"> 
        {
            invoiceText?.filter(e=>e.name!='items'&&e.name!='total_price'&&e.name!='seller').map((el,i)=>{
                return(
                    <div key={i*932} className="labelInput">
                      <label htmlFor="">{removingUnderscoore(useUpperFirstLetter(el.name))}</label>
                      <input disabled type="text" value={dataItemData[el?.name]} />
                    </div>
                )
            })
        }
    </div>
    <div className="invoice-delete-update">
         <button onClick={()=>handleDleteInvoice(dataItemData?._id)} className='delete-invoice'>Delete Invoice</button>
         <button className='update-invoice' >Edit</button>
    </div>
    
</div>
  )
}
