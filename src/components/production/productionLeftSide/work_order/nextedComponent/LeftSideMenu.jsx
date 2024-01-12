import { Button } from '@material-ui/core'
import React from 'react'
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux';
import { changeVal } from '../../../../../store/productionNavigation';

export const LeftSideMenu = ({id}) => {
  const dispatch=useDispatch()
  const fields=['Bom']
  return (
    <div className='leftSectionNavigation'>
        <div className="container-work-nexted flex column">
          {
            fields?.map(field=>{
              return <Button onClick={()=>dispatch(changeVal({key:'bom',value:id}))} style={{width:'100px'}} className='primerycl'>
                {<LiaMoneyBillWaveSolid style={{fontSize:'27px',paddingRight:'7px'}}/>}{field}</Button>
            })
          }
        </div>
    </div>
  )
}