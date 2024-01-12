import { Button } from '@material-ui/core'
import React from 'react'
import { HrBtnSection } from './HrBtnSection'

export const HrLeftSection = () => {
  const btnFields=['employee','other']
   
  return (
    <div className="hr-btn-section">
      <div className="left-section-hr">
        {
          btnFields?.map((el,i)=>{
            return <HrBtnSection property={el} index={i}/>
            })
        }
      </div>
    </div>
  )
}