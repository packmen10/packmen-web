import React from 'react'
import { onClickChangeHrNav } from '../../store/hrNavigation'
import { useDispatch, useSelector } from 'react-redux'
import {FaUsers} from 'react-icons/fa'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import { Button } from '@material-ui/core'

export const HrBtnSection = ({property,index}) => {

const hrNav=useSelector(state=> state?.hrNavigation?.status)
const dispatch=useDispatch()

const iconStyle={
  color:'white',
  fontSize:'23px',
  marginRight:'10px',
  ...!hrNav[property]?{color:"rgb(135 133 133)"}:{}
}

const icons=[
  <FaUsers style={iconStyle}/>

]

const handleChangeNav=()=>{
  dispatch(onClickChangeHrNav({key:property}))

}


  return (
    <Button onClick={handleChangeNav} >{icons[index]}{useUpperFirstLetter(removingUnderscoore(property))}</Button>
  )
}
