import React, { useRef, useState } from 'react'
import { useAddNewIssueNotMutation, useGetAllEmployeesQuery, useGetAllIssueNotQuery, useGetAllWorkOrderNoQuery, useSearchEmployeeQuery, useSearchWorkOrderNoQuery } from '../../store/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setIssueNotStatus } from '../../store/issueNotNavigation'
import DataTable from '../othreComponents/DataTable'
import { DataItems } from './DataItems'
import { TextField } from '@mui/material'
import { Button } from '@material-ui/core'

export const Issue_not_cmp = () => {

    const issueNotNav=useSelector(state=>state.issueNotNav.issueNotDetail)
    console.log(issueNotNav)

    const[searchString,setSearchString]= useState('')
    const[searchWorkNo,setSearchWorkNo]=useState('')
    const dispatch=useDispatch()

    const workUlEl=useRef(null)
    const employeeUlEl=useRef(null)

    const[issueNot,setIssueNot]=useState({
        workOrderNo:'',
        issued_to:'',
        date:'',
        items:[],
        isCreated:false
    })

    const {data:workOrderNoData}= useGetAllWorkOrderNoQuery()
    const {data:employeeDetailesData}=useGetAllEmployeesQuery()
    const {data:employeeData}=useSearchEmployeeQuery(searchString)
    const{data:workOrderData}=useSearchWorkOrderNoQuery(searchWorkNo)
    const[addNewIssueNot]=useAddNewIssueNotMutation()
    const{data:issueNotData}=useGetAllIssueNotQuery()


    const getData=()=>{
        return issueNotData?.data?.map(el=>{
            const newEl={
                ...el,
                workOrderNo:workOrderNoData?.data?.find(e=>e._id==el.workOrderNo)?.work_no,
                issued_to:employeeDetailesData?.data?.find(e=>e._id==el.issued_to)?.name
            }
            return newEl
        })
    }

    const getDate=()=>{
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const handlePassData=(val,data,key)=>{
        setIssueNot(pre=>{
            return {...pre,[key]:val,date:getDate(),finish:false}
        })
        if(key=='workOrderNo'){
            if(workUlEl.current) workUlEl.current.style.display='none'
            setSearchWorkNo(data.work_no)
        }
        if(key=='issued_to'){
            setSearchString(data?.name)
            if(employeeUlEl.current) employeeUlEl.current.style.display='none'
        }
    }

    const handleChangeVal=(v,refEl,handleFun)=>{
        handleFun(v.target.value,)
        if( refEl.current)  refEl.current.style.display='block'
    }

    const handleCreate=()=>{
        addNewIssueNot(issueNot)
        handleCancel()
    }

    const handleCancel=()=>{
        setIssueNot({
            workOrderNo:'',
            issued_to:'',
            date:'',
            items:[]
        })
        setSearchString('')
        setSearchWorkNo('')
    }

    const handleGetSection=(data)=>{
        dispatch(setIssueNotStatus(issueNotData?.data?.find(el=>el._id==data._id)._id))
    }


  return (
    <div className='issue-not'>
        {!issueNotNav&&(
            <>
                <div className="table-component" style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <DataTable tHead={['No','workOrderNo','date','issued_to']} dataField={getData()} DataItemsCmp={DataItems} />
                </div>
                <div className="create-section">
                    <div className="create-section-field">
                        <h3 style={{color:'#347dac',paddingBottom:'20px'}}>Create issue note</h3>
                        <div className="input-label-fields">
                            <TextField InputLabelProps={{ shrink: true, required: true }} style={{width:'100%'}} variant='standard' label='Work order no' value={searchWorkNo} type="number" onChange={(e)=>handleChangeVal(e,workUlEl,setSearchWorkNo)} />
                            <ul ref={workUlEl}>
                                {
                                    workOrderData?.data?.map(el=><li  onClick={()=>handlePassData(el._id,el,'workOrderNo')} >{el?.work_no}</li>)
                                }
                            </ul>
                        </div>
                        <div className="input-label-fields">
                            <TextField InputLabelProps={{shrink:true,required:true}} style={{width:'100%'}} variant='standard' label='Date' type="text" value={getDate()}/>
                        </div>
                        <div className="input-label-fields">
                            <TextField InputLabelProps={{shrink:true,required:true}} style={{width:'100%'}} variant='standard' label='Issued To' value={searchString} type="search" onChange={(e)=>handleChangeVal(e,employeeUlEl,setSearchString)}/>
                            <ul ref={employeeUlEl}>
                                {
                                    employeeData?.data?.map(el=> <li onClick={()=>handlePassData(el._id,el,'issued_to')}>{el?.name}</li>)
                                }
                            </ul>
                        </div>
                        <div className="btn-section" style={{paddingTop:'20px'}}>
                            <Button onClick={handleCreate} >Create</Button>
                            <Button onClick={handleCancel} >Cancel</Button>
                        </div>
                    </div>
                </div>
            </>
        )}
        {issueNotNav&&(<IssueNotDetail />)}
    </div>
  )
}