import React, { useEffect } from 'react'
import { useGetAllEmployeesQuery, useGetAllIssueNotQuery } from '../../../../../store/apiSlice'

export const IssueNote = ({setProgress,id,index}) => {
    const{data:issueNoteData}=useGetAllIssueNotQuery()
    const{data:employeeData}=useGetAllEmployeesQuery()

    const headerStyle = {
        backgroundColor: '#347dac',
        color: 'white',
        borderRadius: '5px'
    };

    const getDataField=()=>{
       return issueNoteData?.data?.filter(iNote=> iNote?.items?.some(item=> item?.bomId==id))
    }

    const getEmployeeData=(employeeId)=>{
       return employeeData?.data?.find(empolyee=> empolyee?._id==employeeId)?.name
    }

    useEffect(()=>{
      if(getDataField()?.length>0)
      setProgress(pre=> pre?.map((_,i)=> i<=index?true:false))
    },[issueNoteData])

 if(getDataField()?.length>0)
  return (
    <div className='IssueNote flex justify-cen'>
        <table style={{ borderSpacing: '5px', maxWidth: '800px', width: '100%' }}>
            <thead>
              <tr>
                  <td style={headerStyle}>No</td>
                  <td style={headerStyle}>Date</td>
                  <td style={headerStyle}>Issued to</td>
              </tr>
            </thead>
            <tbody>
                {
                  getDataField().map((iNote,no)=>{
                      return <tr >
                      <td>{no+1}</td>
                      <td>{iNote?.date}</td>
                      <td>{getEmployeeData(iNote?.issued_to)}</td>
                  </tr>
                  })
                }
            </tbody>
        </table>
    </div>
  )
  else 
  return <h4 style={{textAlign:'center',width:'100%'}}>Empty</h4>
}
