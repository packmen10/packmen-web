import React, { useState } from 'react'
import DataTable from '../../../othreComponents/DataTable'
import { Button, TextField } from '@material-ui/core'
import { useAddNewMirMutation, useGetAllMirQuery } from '../../../../store/apiSlice'
import { MirCreateSection } from './MirCreateSection'


export const Mir = () => {
  const[addNewMir]=useAddNewMirMutation()
  const{data:mirData}=useGetAllMirQuery()

  const defualtMirValue={
    mir_no:'',
    mir_date:'',
    mir_item:[]
  }

  const[mirField,setMirFieldData]=useState(defualtMirValue)

  const handleChange=(val,key)=>{
    setMirFieldData(pre=>({
      ...pre,
      [key]:val
    }))
  }

  const handleCreate=()=>{
    addNewMir(mirField)
    setMirFieldData(defualtMirValue)
  }

  return(
    <div className='mir flex' style={{
      maxWidth:'80vw',
      width:'100%'
    }}>
        <div className="mir-table-section" style={{
          maxWidth:'60vw',
          width:'100%'
        }}>
            <DataTable DataItemsCmp={MirCreateSection} tHead={['No','mir_no','mir_date']} dataField={mirData?.data} />
        </div>
        <div className="mir_create_section">
          <div className="mir_create_section_container">
            <h3>Create new mir</h3>
             <TextField value={mirField?.mir_no} onChange={(e)=>handleChange(e.target.value,'mir_no')} style={{width:'100%'}} label="Mir no" InputLabelProps={{ shrink: true, required: true }} /> 
             <TextField value={mirField?.mir_date} onChange={(e)=>handleChange(e.target.value,'mir_date')} style={{width:'100%'}} label="Mir date" type='date' InputLabelProps={{ shrink: true, required: true }} />
             <div className="mir_crete_btn">
              <Button onClick={handleCreate}  >Create</Button>
              <Button onClick={()=>setMirFieldData(defualtMirValue)} >Cancel</Button>
             </div>
          </div>
        </div>
    </div>
  )
}