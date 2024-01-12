import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  changeTheStatusOfStoreState,   } from '../../store/storeNavigation'
import { Button } from '@material-ui/core'
import { FaFileInvoice } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { MdAddModerator, MdOutlineSell } from 'react-icons/md'
import { GoIssueClosed } from 'react-icons/go'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'


const ControllerLeftSection = () => {

  /* store left siede button navigation section */
  const storeNavigate=useSelector(state=> state.storeNavigationReducer.storeStates)
  const dispatch=useDispatch()

  const handleStatusClick=(key)=>{
   dispatch(changeTheStatusOfStoreState({key,value:true}))
  }
  
  const iconStyle={
    fontSize:'23px',
    marginRight:'10px',
  }
  
  const icons={
    invoice:<FaFileInvoice style={iconStyle}/>,
    sellers:<AiOutlineAppstoreAdd style={iconStyle}/>,
    items:<MdOutlineSell style={iconStyle}/>,
    issue_note:<GoIssueClosed style={iconStyle}/>,
    po:<MdAddModerator style={iconStyle}/>
  }

  const getAllButtons=()=>{
    let allNavButtons=[]
    for(let key in storeNavigate){
        if(key!='id' && key!=='invoiceDetailes'&& key!='editOption')
          allNavButtons.push(
          <Button onClick={()=>handleStatusClick(key)}
          style={{
            textTransform:'none',
            justifyContent:'flex-start',
            paddingLeft:'80px',
            ...storeNavigate[key]?
            {backgroundColor:'#347dac',color:'white'}:
            {color:'rgb(135, 133, 133)'}
          }}
          className='btnel'>{icons[key]}{removingUnderscoore(useUpperFirstLetter(key))}</Button>)
    }
    return allNavButtons
  }
  
  return (
    <div className="left-side-nav">
      <div className="left-section">
        {
          getAllButtons()
        }
      </div>
    </div>
  )
}

export default ControllerLeftSection