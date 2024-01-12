import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removingUnderscoore } from '../../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../../costoumHoks/useUpperFirstLetter'
import { changeVal } from '../../../store/productionNavigation'
import { Button } from '@material-ui/core'
import {AiFillCustomerService} from 'react-icons/ai' 
import {MdConstruction} from 'react-icons/md'
import { TbReport } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIdCardSharp } from "react-icons/io5";
import { MdSource } from "react-icons/md";
import { HiCheckBadge } from "react-icons/hi2";


export const ProductionLeftSide = ({}) => {
   const productionNavigationstatus = useSelector(state=>state.productionNavigation.normelField)
   const dispatch=useDispatch()

   const handleStatusClick=(key)=>{
    dispatch(changeVal({key,value:true}))
   }

   const iconsStyle={
    fontSize:'23px',
    marginRight:'10px',
   }

  const icons={
   customer:<AiFillCustomerService style={iconsStyle}/>,
   work_order:<MdConstruction style={iconsStyle}/>,
   MIR:<TbReport style={iconsStyle} />,
   Machining_log:<AiOutlineSetting style={iconsStyle}/>,
   Job_card:<IoIdCardSharp style={iconsStyle} />,
   Out_sourcing:<MdSource style={iconsStyle}/>,
   QC:<HiCheckBadge  style={iconsStyle} />
  }

  const getAllButtons=()=>{
    let allNavButtons=[]
    for(let key in productionNavigationstatus){
        if(key!='bom')
          allNavButtons.push(
          <Button onClick={()=>handleStatusClick(key)}
          style={{
            textTransform:'none',
            justifyContent:'flex-start',
            paddingLeft:'80px',
            ...productionNavigationstatus[key]?
            {backgroundColor:'#347dac',color:'white'}:
            {color:'rgb(135, 133, 133)'}
          }}
          className='btnel'>{icons[key]}{removingUnderscoore(useUpperFirstLetter(key))}</Button>)
    }
    return allNavButtons
  }

  return (
    <div className="production-btn-container">
      <div className='production-left-side'>
          {getAllButtons()}
      </div>
    </div>
  )
}