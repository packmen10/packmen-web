import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { removingUnderscoore } from '../../../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../../../costoumHoks/useUpperFirstLetter'
import { useCreateWorkOrderNoMutation, useGetAllCustomerQuery, useGetWorckOrdernoByIdMutation, useUpdateWorkOrderNoMutation } from '../../../../store/apiSlice'

export const CreateAndEditWorkOrder = ({createField,resetDataFromEdit,selectedDataForEdit}) => {

  const[createWorkOrder]=useCreateWorkOrderNoMutation()
  const{data:allCustomerData}=useGetAllCustomerQuery()
  const[getWorOrder,{data:workOrderDataById}]=useGetWorckOrdernoByIdMutation()
  const[updateWorkOrder]=useUpdateWorkOrderNoMutation()

  useEffect(()=>{
    getWorOrder(selectedDataForEdit)
  },[selectedDataForEdit])

  const defualtValues={
    work_no:'',
    work_date:'',
    customer:'',
    product_description:'',
    delivery_date:'',
  }
  
  const[fieldValue,setFieldValue]=useState(defualtValues)
  const[editFieldValue,setEditValue]=useState({})

  const [customer, setCustomer] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose =()=>{
    setOpen(false);
  };

  const handleOpen =()=>{
    setOpen(true);
  };

  const handleCreateAndEdit=()=>{
    if(!selectedDataForEdit){
      for(let key in fieldValue){
        if(fieldValue[key]=='') return
      }
      createWorkOrder(fieldValue)
      setFieldValue(defualtValues)
      setCustomer('')
    }else{
      for(let key in defualtValues){
        if(editFieldValue?.hasOwnProperty(key)){
          updateWorkOrder({id:selectedDataForEdit,...editFieldValue})
          handleCancel()
          return
        }
      }
    }
  }

  const btnStyle={
    width:'100%',
    height:'50px',
    textTransform:'none',
    fontSize:'17px'
  }

  const handleCancel =()=> {
    setCustomer('')
    resetDataFromEdit(null)
    setEditValue({})
    setFieldValue(defualtValues)
  }

  return (
  <div className='work-order-create-field'>
    <div className="work-order-create-container">
      <h3 style={{width:'100%',textAlign:'start',padding:'15px 0',color:'#347dac'}}>Create work order</h3>
        {
            createField?.map(labelName=>{
              if(labelName?.name=='customer'){
                return <FormControl  style={{width:"100%",marginTop:"3px",marginBottom:'3px'}} >
                  <InputLabel style={{fontSize:"14px"}} id="demo-controlled-open-select-label">Customer</InputLabel>
                      <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={editFieldValue?.customer || workOrderDataById?.data?.customer || customer}
                        onChange={(e)=>{
                            if(!selectedDataForEdit){
                              setCustomer(e.target.value)
                              setFieldValue(pre=>(
                                {...pre,customer:e.target.value}
                              ))
                            }else{
                              setCustomer(e.target.value)
                              setEditValue(pre=> ({
                                ...pre,
                                customer:e.target.value
                              }))
                            }
                        }}
                          style={{width:'100%'}}>
                            {
                              allCustomerData?.data?.map(customer=>{
                                return  <MenuItem value={customer?._id} >{useUpperFirstLetter(removingUnderscoore(customer?.name))}</MenuItem>
                              })
                            }
                      </Select>
                  </FormControl>
              }
                return <TextField value={editFieldValue[labelName?.name]||workOrderDataById?.data[labelName?.name]||fieldValue[labelName?.name]} 
                type={labelName?.type}
                onChange={(e)=>{
                  if(!selectedDataForEdit){
                    setFieldValue(pre=>({...pre,[labelName?.name]:e.target.value}))
                  }else{
                    setEditValue(pre=>({
                      ...pre,
                      [labelName?.name]:e.target.value
                    }))
                  }
                }}
                style={{width:'100%'}} 
                label={removingUnderscoore(useUpperFirstLetter(labelName?.name))}
                InputLabelProps={{ shrink: true, required: true }}
                variant='standard' />
            }) 
        }
        <div className="work-order-btns flex" style={{width:'100%',paddingTop:'20px'}}>
          <Button onClick={handleCreateAndEdit} style={btnStyle}>Create</Button>
          <Button onClick={handleCancel}
          style={btnStyle}>Cancel</Button>
        </div>
    </div>
  </div>
  )
}