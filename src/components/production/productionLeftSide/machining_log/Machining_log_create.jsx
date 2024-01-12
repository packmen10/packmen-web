import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAddMachinig_logMutation, useGetAllBomQuery, useGetAllEmployeesQuery, useGetAllWorkOrderNoQuery } from '../../../../store/apiSlice'


export const Machining_log_create = () => {
    const{data:bomData}=useGetAllBomQuery()
    const{data:employeeData}=useGetAllEmployeesQuery()
    const{data:workOrderNoData}=useGetAllWorkOrderNoQuery()
    const[addMachiningData]=useAddMachinig_logMutation()

    const[workOrderNo,setWorkOrderNo]=useState('')

    //machining log
    const defaultMachiningLog={
      part_name:'',
      machine_type:'',
      operator:'',
      date:'',
      start_time:'',
      end_time:'',
      duration:'',
      quantity:'',
      bom:""
    }

    const[machineLogData,setMachinelog]=useState(defaultMachiningLog)

    const getWorkOrderNo=(workOrderId)=>{
     return workOrderNoData?.data?.find(workOrder=> workOrder?._id==workOrderId)?.work_no
    }

    const getPartNameByWorkOrderId=()=>{
     return bomData?.data?.filter(bom=> bom?.work_order_no==workOrderNo )
    }

    const handleClickCreate=() => {
      addMachiningData(machineLogData)
      handleCancel()
    }

    const handleCancel=()=>{
      setMachinelog(defaultMachiningLog)
      setWorkOrderNo('')
    }

  return (
    <div className="machining_log_right_create flex column" style={{gap:'5px'}}>
        <h3>Crete new machining log</h3>
        
            <FormControl variant="standard" >
             <InputLabel id="demo-simple-select-label">Work order no</InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={workOrderNo}
              label="work_order_no"
              onChange={(e)=> setWorkOrderNo(e.target.value)}
             >
              {
                bomData?.data?.map(data=>{
                  return <MenuItem  value={data?.work_order_no} >{getWorkOrderNo(data?.work_order_no)}</MenuItem>
                })
              }
             </Select>
            </FormControl>

        {workOrderNo&&(
            <FormControl variant="standard" >
             <InputLabel id="demo-simple-select-label">Part name</InputLabel>
             <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={machineLogData?.part_name}
              label="work_order_no"
              onChange={(e)=> setMachinelog(pre=>({...pre,part_name:e.target.value,bom:e.target.value}))}
             >
              {
               getPartNameByWorkOrderId().map(data=>{
                 return <MenuItem  value={data?._id} >{data?.part_name}</MenuItem>
               })
              }
             </Select>
            </FormControl>
        )}
            <FormControl variant="standard" >
             <InputLabel  id="demo-simple-select-standard-label" >Machine type</InputLabel>
             <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={machineLogData?.machine_type}
              label="work_order_no"
              onChange={ (e)=> setMachinelog(pre=> ({...pre,machine_type:e.target.value})) }
             >
               <MenuItem  value='lathe' >lathe</MenuItem>
               <MenuItem  value='miling' >miling</MenuItem>
             </Select>
             </FormControl>

                <FormControl variant="standard" >
                 <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                 <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={machineLogData?.operator}
                  label="work_order_no"
                  onChange={ (e)=> setMachinelog(pre=> ({...pre,operator:e.target.value})) }
                  variant='standard'
                  >
                  {
                    employeeData?.data?.map(employee=>{
                      return <MenuItem  value={employee?.name} >{employee?.name}</MenuItem>
                    })
                  }
                 </Select>
                </FormControl>

              <TextField label='Quantity' value={machineLogData?.quantity} variant='standard' type='number' onChange={(e)=>setMachinelog(pre=> ({...pre,quantity:+e.target.value}))} />
              <TextField label='Date' value={machineLogData?.date} InputLabelProps={{shrink:true,required:true}} variant='standard' type='date' onChange={(e)=>setMachinelog(pre=> ({...pre,date:e.target.value}))} />
              <TextField label='Start time' value={machineLogData?.start_time} InputLabelProps={{shrink:true,required:true}} variant='standard' type='time' onChange={(e)=>setMachinelog(pre=> ({...pre,start_time:e.target.value}))} />
              <TextField label='End time' value={machineLogData?.end_time} InputLabelProps={{shrink:true,required:true}} variant='standard' type='time' onChange={(e)=>setMachinelog(pre=> ({...pre,end_time:e.target.value}))} />
      <div className="machine_log_btns">
        <Button onClick={handleClickCreate} style={{textTransform:'none'}}>Create</Button>
        <Button onClick={handleCancel} style={{textTransform:'none'}}>Cancel</Button>
      </div>
    </div>
  )
}