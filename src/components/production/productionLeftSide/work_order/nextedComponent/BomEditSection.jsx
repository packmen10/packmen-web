import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useUpdateBomMutation } from '../../../../../store/apiSlice'

export const BomEditSection = ({bomData}) => {
const [updateBom]=useUpdateBomMutation()

const [updatedField,setUpdate]=useState({})
const keysArray = Object.keys(updatedField); 


const handleChange=(changeValue,key)=>{
    setUpdate(pre=>({
        ...pre,
        [key]:changeValue?.target?.value
    }))
}

const handleLetUpdate=()=>{
    updateBom({id:bomData?._id,...updatedField})
    setUpdate({})
}
  return (
    <>
        <div className='BomEditSection'>
                <TextField label='Section'  InputLabelProps={{shrink:true,required:true}} onChange={(value)=>handleChange(value,'section')} variant='standard' value={updatedField?.hasOwnProperty('section') ? updatedField?.section :bomData?.section}/>
                <TextField label='Part name' InputLabelProps={{shrink:true,required:true}}  onChange={(value)=>handleChange(value,"part_name")} variant='standard' value={updatedField?.hasOwnProperty('part_name') ? updatedField?.part_name: bomData?.part_name}/>
                <TextField label='part no' InputLabelProps={{shrink:true,required:true}}  onChange={(value)=>handleChange(value,"part_no")} variant='standard' value={updatedField?.hasOwnProperty("part_no") ? updatedField?.part_no : bomData?.part_no}/>
        </div>
        <div className="bom-update-btn">
            {
                keysArray?.length>0 && <Button onClick={handleLetUpdate}>Save</Button>
            }
        </div>
    </>
  )
}
