import React, { useState } from 'react'
import { useDeleteMachining_logMutation, useGetBomByIdQuery, useGetMahining_logQuery, useUpdateMachinig_logMutation } from '../../../../store/apiSlice'
import { Button, TextField } from '@mui/material'

export const SingleMachining_log = ({id}) => {
  const{data:machiningData}=useGetMahining_logQuery(id)
  const[updateMach]=useUpdateMachinig_logMutation()
  const[deleteMach]=useDeleteMachining_logMutation()
  const {data:bomD}=useGetBomByIdQuery(machiningData?.data?.part_name)

  const[updatedField,setUpdateField]=useState({})
  const lengthOfUpdatedField=Object.keys(updatedField).length;

  const updateMachining_log=()=>{
    console.log(updatedField,'exicuted')
    for(let key in updatedField){
      if(updatedField[key]=='') return
    }
    updateMach({id,...updatedField})
    setUpdateField({})
  }

  const deleteMachining_log=()=>{
    deleteMach(id)
  }

  
  const getData=()=>{
    const inputField=[]
    for(let key in machiningData?.data){
      if(key!='__v'&&key!='_id'&&key!='bom'){
        if(key=='part_name'||key=='duration'||key=='operator'||key=='machine_type'||key=='part_name'){
            inputField?.push(<TextField InputLabelProps={{ shrink: true, required: true }}
            className={key} label={key} value={key=='part_name'?bomD?.data?.part_name:machiningData?.data[key]} variant='standard'/>)
            
          continue
        }
        inputField?.push( <TextField  onChange={(e)=>setUpdateField(pre=> ({...pre,[key]:e.target.value}))}
        InputLabelProps={{ shrink: true, required: true }}
        className={key} label={key} value={updatedField[key] || updatedField?.hasOwnProperty(key)? null : machiningData?.data[key]} variant='standard'/> )
      }
    }
    return inputField
  }

  return (
    <>
       <div className='singlemachinig_log'>
         {
           getData()
         }
       </div>
       <div className="single_machinge_log flex justify-cen" style={{paddingTop:'7px',gap:'5px',width:'100%'}}>
        <Button onClick={deleteMachining_log} style={{textTransform:'none'}}>Delete</Button>
        { lengthOfUpdatedField>0&&( <Button onClick={updateMachining_log}  style={{textTransform:'none'}}>Save</Button> )}
       </div>
    </>
  )
}