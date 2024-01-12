import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useAddQcMutation, useGetAllBomQuery, useGetAllEmployeesQuery, useGetAllWorkOrderNoQuery} from '../../store/apiSlice'

export const QcCreateSection = () => {
    const {data:workOrderData}=useGetAllWorkOrderNoQuery()
    const{data:employeeDatas}=useGetAllEmployeesQuery()
    const {data:bomDatas}=useGetAllBomQuery()
    const[addQc]=useAddQcMutation()

    const fields={
        part_name:'',
        section:'',
        qc_done_by:'',
        bom:'',
        date:''
    }
    
    const [section,setSection]=useState(null)
    const [seletedWorkOrder,setWorkOrder]=useState(null)
    const [dataField,setDataField]=useState(fields)
    
    const handleCancel =()=>{
        setDataField(fields)
        setWorkOrder(null)
    }

    const handleCreate =()=>{
        addQc(dataField)
        handleCancel()
    }

  return (
    <div className='QcCreateSection' >
       <div className="create_container flex column" style={{padding:'30px',boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',gap:'5px'}}>
        <h3  style={{padding:'5px 0',color:'#347dac'}}>Create new qc</h3>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Work order no</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={seletedWorkOrder}
              label="Age"
              onChange={(e)=> setWorkOrder(e.target.value)}
            >
              {
                workOrderData?.data?.map(workData=>{
                       return <MenuItem value={workData?._id} >{workData?.work_no}</MenuItem>
                })
              }
            </Select>
        </FormControl>
      
        {seletedWorkOrder&&(
          <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Part name</InputLabel>
                     <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={dataField?.part_name}
                       label="Age"
                       onChange={(e)=> setDataField(pre =>  ({...pre,part_name:e.target.value}))}
                     >
                       {
                         bomDatas?.data?.filter(bom=> bom?.work_order_no==seletedWorkOrder).map(bom=>{
                                return <MenuItem value={bom?.part_name} >{bom?.part_name}</MenuItem>
                         })
                       }
                     </Select>
                  </FormControl>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Section</InputLabel>
                     <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={section}
                       label="Age"
                       onChange={(e)=>{
                        setSection(e.target.value)
                        setDataField(pre =>  ({...pre,section: e.target.value?.split('~')[0],bom:e.target.value?.split('~')[1]}))
                       }}
                     >
                       {
                         bomDatas?.data?.filter(bom=> bom?.work_order_no==seletedWorkOrder).map(bom=>{
                                return <MenuItem value={ `${bom?.section}~${bom?._id}`} >{bom?.section}</MenuItem>
                         })
                       }
                     </Select>
              </FormControl>
          </>
        )}

           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">QC done by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dataField?.qc_done_by}
                  label="Age"
                  onChange={(e)=> setDataField(pre => ({...pre,qc_done_by:e.target.value}))}
                >
                  {
                    employeeDatas?.data?.map(employee=>{
                           return <MenuItem value={ employee?.name } >{employee?.name}</MenuItem>
                    })
                  }
                </Select>
          </FormControl>
          <TextField type='date' label='date' InputLabelProps={{shrink:true,required:true}} onChange={(e)=> setDataField(pre => ({...pre,date:e.target.value}))} value={dataField?.date} />
          <div className="qc_btns flex justify-cen" style={{paddingTop:'10px'}}>
            <Button style={{textTransform:'none',width:'100%',height:'50px'}} onClick={handleCreate} >Create</Button>
            <Button style={{textTransform:'none',width:'100%',height:'50px'}} onClick={handleCancel} >Cancel</Button>
          </div>
        </div>
    </div>
  )
}