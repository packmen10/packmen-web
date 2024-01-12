import React, { useState } from 'react'
import { useAddOutSourceMutation, useGetAllBomQuery, useGetAllCustomerQuery, useGetAllSellersQuery, useGetAllWorkOrderNoQuery } from '../../../../store/apiSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'

export const OutSourceCreate = () => {
  const{data:supplierData}=useGetAllSellersQuery()
/*   const{data:workOrderData}=useGetAllWorkOrderNoQuery() */
  const[addOutSource]=useAddOutSourceMutation()
/*   const{data:bomData}=useGetAllBomQuery() */
  
  const fields={
      ds_no:"",
      date:"",
      supplier:"",
      out_source_items:[]
  }

  const [dataField,setDataField]=useState(fields)

/*   const getWorkOrderNo=(idFromBom)=>{
    return workOrderData?.data?.find(workOrder=> workOrder?._id==idFromBom)?.work_no
  } */

/*   const status=['on going','succes','pending'] */

  const cancelOutSource=()=>{
    setDataField(fields)
  }

  const create_out_sorce = () => {
    addOutSource(dataField)
    cancelOutSource()
  }

  return (
    <div className='out-sorce-create flex column' style={{ position:'fixed',maxWidth:'20vw',width:'100%'}}>
      <h3>Create out source</h3>
<TextField variant='standard' label='Ds no' value={dataField?.ds_no} onChange={(e)=>setDataField(pre=> ({...pre,ds_no:e.target.value})) }/>
  <FormControl variant="standard">
    
        <InputLabel id="demo-simple-select-standard-label">Supplier</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={dataField?.supplier}
          onChange={(e)=>setDataField(pre=> ({...pre,supplier:e.target.value}))}
          label="supplier"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            supplierData?.data?.map((supplier)=>{
              return <MenuItem value={supplier?.name}>{supplier?.name}</MenuItem>
            })
          }
        </Select>

  </FormControl>
    <TextField variant='standard' value={dataField?.date} onChange={(e)=>setDataField(pre=> ({...pre,date:e.target.value}))} InputLabelProps={{shrink:true,required:true}} type='date' label='Date' />

  <div className="out-source-btns flex">
    <Button onClick={create_out_sorce}>Create</Button>
    <Button onClick={cancelOutSource}>Cancel</Button>
  </div>
  </div>
  )
}
