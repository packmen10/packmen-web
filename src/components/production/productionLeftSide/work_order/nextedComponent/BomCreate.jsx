import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { removingUnderscoore } from '../../../../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../../../../costoumHoks/useUpperFirstLetter'
import { useAddBomMutation } from '../../../../../store/apiSlice'

export const BomCreate = ({fields,id}) => {

  const [addNewBom]=useAddBomMutation()

  const dataFields={
      section:'',
      part_name:'',
      part_no:'',
      work_order_no:id
  }

  const[fieldData,setFieldData]=useState(dataFields)

  const handleCrete=()=>{
    for(let key in  fieldData){
      if(fieldData[key]=='') return
    }
    addNewBom(fieldData)
    setFieldData(dataFields)
  }

  return(
     <div className="create-container flex column">
       <h3>Create new bom</h3>

       {
        fields?.map(field=>{
              if(field!='work_order_no'&&field!='Status')
              return <TextField
              onChange={(e)=>{
                setFieldData(pre=>({
                  ...pre,
                  [field]:e.target.value
                }))
              }}
              
              InputLabelProps={{shrink:true,required:true}}
              variant='standard'
              label={removingUnderscoore(useUpperFirstLetter(field))}
              value={fieldData[field]} />
        })
       }
      <div className="btns">
            <Button onClick={handleCrete}>Create</Button>
           <Button onClick={()=>setFieldData(dataFields)}>Cancel</Button>
      </div>
     </div>
  )
}