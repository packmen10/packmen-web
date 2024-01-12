import React, { useState } from 'react'
import { useAddPoMutation, useGetAllSellersQuery } from '../../store/apiSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'

export const PoRightSection = () => {
    /*seller,po number,mir items,date,bom id,mir id,*/
    const{data:sellerData}=useGetAllSellersQuery()

    const[addPo]=useAddPoMutation()

    const defualtDataField={
        seller:"",
        po_no:"",
        items:[],
        date:"",
    }

    const [dataField,setDataField]=useState(defualtDataField)

    
    const handleChange=(key,value)=>{
        setDataField(pre=> ({...pre,[key]:value}))
    }

    const handleCreate=()=>{
        for(let key in dataField){
            if(dataField[key]==''&&key!=='items') return
        }
        addPo(dataField)
        handleCancel()
    }

    const handleCancel=()=>{
        setDataField(defualtDataField)
    }

  return(
    <div className='PoRightSection flex column' style={{gap:'5px',maxWidth:"20vw",width:"100%",position:"fixed",padding:"30px",boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',}}>
        <h4 style={{color:"#347dac"}}>Create new PO</h4>
        
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
           <InputLabel id="demo-simple-select-standard-label">Seller</InputLabel>
           <Select
             labelId="demo-simple-select-standard-label"
             id="demo-simple-select-standard"
             value={dataField?.seller}
             onChange={(e)=>handleChange('seller',e.target.value)}
             label="Age"
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {sellerData?.data?.map(seller=>{
               return <MenuItem value={seller?.name} >{seller?.name}</MenuItem>
             })}
           </Select>
      </FormControl>

      <TextField label='Po no' variant='standard' value={dataField?.po_no} onChange={(e)=>handleChange('po_no',e.target.value)} />
      <TextField InputLabelProps={{shrink:true}} label='Date' type='date' value={dataField?.date} onChange={(e)=>handleChange('date',e.target.value)}/>
      <div className="btn-field flex" style={{paddingTop:'10px'}}> 
        <Button style={{width:'100%',textTransform:'none',height:"50px"}} onClick={handleCreate}>Create</Button>
        <Button  style={{width:'100%',textTransform:'none',height:"50px"}} onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  )
}
