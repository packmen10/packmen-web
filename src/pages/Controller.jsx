import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InvoiceController from '../components/controllerRightSideInvoises/InvoiceController'
import ControllerLeftSection from '../components/controllerLeftSide/ControllerLeftSection'
import { InvoiceDetailes } from '../components/controllerRightSideInvoises/InvoiceDetailes'
import { Sellers } from '../components/controllerRightSellers/Sellers'
import { AllItems } from '../components/controllerRightAllItems/AllItems'
import { Issue_not_cmp } from '../components/Issue_not/Issue_not_cmp'
import { PurchaceOrder } from '../components/storePO/PurchaceOrder'

export const textToUpperCase=(navItem)=>{
  const navItemFirstL=navItem?.slice(0,1)[0]?.toUpperCase()
  const text=navItemFirstL+navItem.slice(1).join("")  
  return text
}

export const Controller = () => {
  /* controller is store section */

  const storeStates=useSelector(state=> state.storeNavigationReducer.storeStates)
  return(
    <div className='controller' >
        <div className="main-body">
          <ControllerLeftSection/>
              {storeStates?.invoice&& <InvoiceController/>}
              {storeStates?.invoiceDetailes&& <InvoiceDetailes/>}
              {storeStates?.sellers&& <Sellers/>}
              {storeStates?.items&& <AllItems/>}
              {storeStates?.issue_note && <Issue_not_cmp/>}
              {storeStates?.po && <PurchaceOrder/>}
          </div>
    </div>
  )
}
