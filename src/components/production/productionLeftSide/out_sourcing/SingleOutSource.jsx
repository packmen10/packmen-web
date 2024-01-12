import React, { useState } from 'react'
import { useDeleteOutSourceMutation, useGetOutSourceQuery, useUpdateOutSourceMutation } from '../../../../store/apiSlice'
import { Button,TextField } from '@material-ui/core'
import { OutSourceCmp } from './OutSourceCmp'

export const SingleOutSource = ({id}) => {

    const{data:outSourceData}=useGetOutSourceQuery(id)
  /* const{data:bomData}=useGetBomByIdQuery(outSourceData?.data?.part_name) */
    const [updateField,setUpdateField]=useState({})
    const lengthOfUpdatedField=Object.keys(updateField).length;
    const [updateOutSource]=useUpdateOutSourceMutation()
    const [deletOutSource]=useDeleteOutSourceMutation()
    
    const handleUpdate=()=>{
      updateOutSource({id,...updateField})
      setUpdateField({})
    }
  return (
<>
  <div className='singleOutSource'>
        <TextField  className='supplier' label='Supplier' InputLabelProps={{shrink:true,required:true}} value={outSourceData?.data?.supplier|| ''}  />
        <TextField className='date' label='Date' InputLabelProps={{shrink:true,required:true}}
        value={updateField?.hasOwnProperty('date')?updateField.date:outSourceData?.data?.date}
        type='Date' onChange={(e)=>setUpdateField(pre=> ({...pre,date:e.target.value}))} />

        <div className="btn flex justify-st">
          {lengthOfUpdatedField>0 && (<Button variant='contained' onClick={handleUpdate} >Save</Button>)}
          <Button onClick={()=>deletOutSource(id)} variant='contained'>Delete</Button>
        </div>
  </div>
  <OutSourceCmp id={id}/>
</>
  )
}
